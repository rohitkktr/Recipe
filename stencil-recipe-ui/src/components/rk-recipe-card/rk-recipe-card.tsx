import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'rk-recipe-card',
  styleUrl: 'rk-recipe-card.scss',
  shadow: true,
})
export class RkRecipeCard {
  @Prop() recipeId!: string;

  @Prop() heading!: string;

  @Prop() image?: string;

  @Prop() subtitle?: string;

  @Prop() favorite: boolean = false;

  @Prop() hideFavorite: boolean = false;

  @Event({ eventName: 'cardselect' }) cardSelect!: EventEmitter<{ recipeId: string }>;

  @Event({ eventName: 'favoritetoggle' }) favoriteToggle!: EventEmitter<{ recipeId: string; favorite: boolean }>;

  private onSelect = () => {
    this.cardSelect.emit({ recipeId: this.recipeId });
  };

  private onFavClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    this.favoriteToggle.emit({ recipeId: this.recipeId, favorite: !this.favorite });
  };

  render() {
    return (
      <Host>
        <article class="card" onClick={this.onSelect} tabIndex={0}
          onKeyDown={(e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && this.onSelect()}>
          <div class="media">
            {this.image ? <img src={this.image} alt={this.heading} loading="lazy" /> : <div class="placeholder">🍽️</div>}
            {!this.hideFavorite && (
              <button
                class={{ 'fav-btn': true, active: this.favorite }}
                aria-pressed={this.favorite ? 'true' : 'false'}
                aria-label="Toggle favorite"
                onClick={this.onFavClick}
              >
                {this.favorite ? '♥' : '♡'}
              </button>
            )}
          </div>
          <div class="body">
            <h3 class="title">{this.heading}</h3>
            {this.subtitle && <p class="subtitle">{this.subtitle}</p>}
            <slot name="footer" />
          </div>
        </article>
      </Host>
    );
  }
}
