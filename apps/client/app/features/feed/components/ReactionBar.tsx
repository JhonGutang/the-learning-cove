import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "~/lib/utils";
import { sendReaction, type ReactionCounts, type ReactionType } from "~/lib/api";
import { reactionQuery, reactionKeys } from "~/lib/queries";
import { hasLocalReaction, toggleLocalReaction } from "~/lib/localReactions";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "heart", emoji: "❤️", label: "Heart" },
  { type: "wow", emoji: "😮", label: "Wow" },
];

export default function ReactionBar({ blogId }: { blogId: number }) {
  const queryClient = useQueryClient();
  const { data: counts } = useQuery(reactionQuery(blogId));

  const [activeReactions, setActiveReactions] = useState<ReactionType[]>([]);

  useEffect(() => {
    setActiveReactions(
      REACTIONS.filter(({ type }) => hasLocalReaction(blogId, type)).map(({ type }) => type)
    );
  }, [blogId]);

  const { mutate } = useMutation({
    mutationFn: ({ type, delta }: { type: ReactionType; delta: 1 | -1 }) =>
      sendReaction(blogId, type, delta),
    onMutate: async ({ type, delta }) => {
      await queryClient.cancelQueries({ queryKey: reactionKeys.blog(blogId) });
      const prev = queryClient.getQueryData<ReactionCounts>(reactionKeys.blog(blogId));
      queryClient.setQueryData<ReactionCounts>(reactionKeys.blog(blogId), (old) => {
        if (!old) return old;
        return { ...old, [type]: Math.max(0, (old[type] ?? 0) + delta) };
      });
      return { prev };
    },
    onError: (_err, { type, delta }, ctx) => {
      queryClient.setQueryData(reactionKeys.blog(blogId), ctx?.prev);
      toggleLocalReaction(blogId, type);
      setActiveReactions((prev) =>
        delta === 1 ? prev.filter((t) => t !== type) : [...prev, type]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: reactionKeys.blog(blogId) });
    },
  });

  function handleClick(e: React.MouseEvent, type: ReactionType) {
    e.preventDefault();
    e.stopPropagation();

    const nowActive = toggleLocalReaction(blogId, type);
    const delta = nowActive ? 1 : -1;

    setActiveReactions((prev) =>
      nowActive ? [...prev, type] : prev.filter((t) => t !== type)
    );
    mutate({ type, delta });
  }

  return (
    <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
      {REACTIONS.map(({ type, emoji, label }) => {
        const active = activeReactions.includes(type);
        const count = counts?.[type] ?? 0;

        return (
          <button
            key={type}
            aria-label={label}
            aria-pressed={active}
            onClick={(e) => handleClick(e, type)}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              "border select-none cursor-pointer",
              active
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{emoji}</span>
            {count > 0 && <span>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
