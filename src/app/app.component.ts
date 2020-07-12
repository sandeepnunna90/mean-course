import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  StoredPosts = [];

  onPostAdded(post): void {
    this.StoredPosts.push(post);
  }
}
