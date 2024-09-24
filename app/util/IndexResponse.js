export class IndexDTO {
  constructor(id, title, content, thumbnail_file, user_id) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.thumbnail_file = thumbnail_file;
    this.user_id = user_id;
  }
}
