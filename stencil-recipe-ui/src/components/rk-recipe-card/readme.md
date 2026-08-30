# rk-recipe-card



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute       | Description | Type                  | Default     |
| ----------------------- | --------------- | ----------- | --------------------- | ----------- |
| `favorite`              | `favorite`      |             | `boolean`             | `false`     |
| `heading` _(required)_  | `heading`       |             | `string`              | `undefined` |
| `hideFavorite`          | `hide-favorite` |             | `boolean`             | `false`     |
| `image`                 | `image`         |             | `string \| undefined` | `undefined` |
| `recipeId` _(required)_ | `recipe-id`     |             | `string`              | `undefined` |
| `subtitle`              | `subtitle`      |             | `string \| undefined` | `undefined` |


## Events

| Event            | Description | Type                                                    |
| ---------------- | ----------- | ------------------------------------------------------- |
| `cardselect`     |             | `CustomEvent<{ recipeId: string; }>`                    |
| `favoritetoggle` |             | `CustomEvent<{ recipeId: string; favorite: boolean; }>` |


## Slots

| Slot       | Description |
| ---------- | ----------- |
| `"footer"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
