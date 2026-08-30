import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'rk-day-slot',
  styleUrl: 'rk-day-slot.scss',
  shadow: true,
})
export class RkDaySlot {
  @Prop() day!: string;

  @Prop() empty: boolean = true;

  @Event({ eventName: 'addmeal' }) addMeal!: EventEmitter<{ day: string }>;

  @Event({ eventName: 'clearmeal' }) clearMeal!: EventEmitter<{ day: string }>;

  render() {
    return (
      <Host>
        <section class="slot">
          <header>
            <h4>{this.day}</h4>
            {!this.empty && (
              <button class="clear" onClick={() => this.clearMeal.emit({ day: this.day })} aria-label={`Remove meal for ${this.day}`}>
                ✕
              </button>
            )}
          </header>
          <div class="content">
            {this.empty ? (
              <button class="add" onClick={() => this.addMeal.emit({ day: this.day })}>
                + Add a recipe
              </button>
            ) : (
              <slot />
            )}
          </div>
        </section>
      </Host>
    );
  }
}
