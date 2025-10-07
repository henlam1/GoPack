interface AISuggestionsViewProps {
  suggestions: Record<string, string[]>;
}

export function AISuggestionsView({ suggestions }: AISuggestionsViewProps) {
  Object.keys(suggestions).forEach((category) => {
    console.log(category);
  });
  Object.values(suggestions).forEach((items) => {
    console.log(items);
  });

  return (
    <div>
      {Object.entries(suggestions).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h3 className="font-semibold">{category}</h3>
          <ul className="list-disc pl-6">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
