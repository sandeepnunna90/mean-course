import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];

  getPosts(): Post[] {
    return [...this.posts];
  }

  addPost(title: string, content: string): void {
    // ts lint shorthand notation
    // title: title ----> title (can be written like this)
    const post: Post = { title, content };
    this.posts.push(post);
  }
}
