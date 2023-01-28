import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useCallback } from "react";

import { SearchHistoryItem, SearchResult } from "../types/types";
import { SearchHistoryItems } from "../hooks/useSearchHistory";

export default function SearchResultItem({
  searchResult,
  addToHistory,
  removeFromHistory,
  historyItem,
}: {
  addToHistory: (result: SearchHistoryItem) => void;
  removeFromHistory: (result: SearchHistoryItem) => void;
  historyItem?: boolean;
  searchResult: SearchResult;
}) {
  const title = searchResult.kanji || searchResult.reading;
  const onChooseBound = useCallback(
    () => addToHistory(SearchHistoryItems.resultItem(searchResult)),
    [searchResult, addToHistory]
  );

  return (
    <List.Item
      title={title}
      subtitle={searchResult.kanji ? searchResult.reading : ""}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser onOpen={onChooseBound} url={new URL(searchResult.url).href} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              onCopy={onChooseBound}
              title="Copy"
              content={title}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
            {searchResult.reading && (
              <Action.CopyToClipboard
                title="Copy Reading"
                content={searchResult.reading}
                shortcut={{ modifiers: ["cmd", "shift"], key: "." }}
              />
            )}
          </ActionPanel.Section>
          {historyItem && (
            <ActionPanel.Section>
              <Action
                title="Remove from history"
                icon={Icon.Trash}
                shortcut={{ modifiers: ["cmd"], key: "delete" }}
                onAction={() => {
                  removeFromHistory(SearchHistoryItems.resultItem(searchResult));
                }}
              />
            </ActionPanel.Section>
          )}
        </ActionPanel>
      }
      accessories={[
        {
          text: searchResult.definition.join(", ") || "No definition",
        },
      ]}
    />
  );
}
