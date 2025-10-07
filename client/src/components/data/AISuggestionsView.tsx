export function AISuggestionsView(suggestions: Record<string, string[]>) {
  for (const [key, value] of Object.entries(suggestions)) {
    console.log(`Key: ${key}, Value: ${value}`);
  }
  return (
    <div>
      {Object.entries(suggestions).map((key) => {
        return (
          <div>
            <p>{key}</p>
            <div>{suggestions.key}</div>
          </div>
        );
      })}
    </div>
  );
}
