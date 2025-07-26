export function genHexString(length: number) {
  let output = '';
  for (let i = 0; i < length; i++) {
    output += Math.floor(Math.random() * 16).toString(16);
  }
  return output;
}

export function formatDate(date: Date) {
  // Format today's date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const dateFormatted = `${year}-${month}-${day}`;
  return dateFormatted;
}
