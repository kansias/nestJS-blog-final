import { format } from "date-fns";

export class DetailDTO {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = this.formatDate(createdAt);
  }

  formatDate(dateToString) {
    const date = new Date(dateToString);
    return format(date, "yyyy-MM-dd (HH:mm)");
  }
}
