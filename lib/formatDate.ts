export function formatDate(date: string) {
  const result = new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Jakarta",
  });

  return result
}


export function formatDateShort(date: string){
    const result = new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Jakarta",
  });

  return result
}
