import * as migration_20260224_162130_initial_setup from './20260224_162130_initial_setup';
import * as migration_20260224_164012_update_labels_news from './20260224_164012_update_labels_news';
import * as migration_20260224_165347_update_condition_columnist from './20260224_165347_update_condition_columnist';
import * as migration_20260224_165731_add_sinopsis_to_news from './20260224_165731_add_sinopsis_to_news';
import * as migration_20260725_000100_add_promotions from './20260725_000100_add_promotions';
import * as migration_20260725_035837_update_promotions from './20260725_035837_update_promotions';

export const migrations = [
  {
    up: migration_20260224_162130_initial_setup.up,
    down: migration_20260224_162130_initial_setup.down,
    name: '20260224_162130_initial_setup',
  },
  {
    up: migration_20260224_164012_update_labels_news.up,
    down: migration_20260224_164012_update_labels_news.down,
    name: '20260224_164012_update_labels_news',
  },
  {
    up: migration_20260224_165347_update_condition_columnist.up,
    down: migration_20260224_165347_update_condition_columnist.down,
    name: '20260224_165347_update_condition_columnist',
  },
  {
    up: migration_20260224_165731_add_sinopsis_to_news.up,
    down: migration_20260224_165731_add_sinopsis_to_news.down,
    name: '20260224_165731_add_sinopsis_to_news',
  },
  {
    up: migration_20260725_000100_add_promotions.up,
    down: migration_20260725_000100_add_promotions.down,
    name: '20260725_000100_add_promotions',
  },
  {
    up: migration_20260725_035837_update_promotions.up,
    down: migration_20260725_035837_update_promotions.down,
    name: '20260725_035837_update_promotions'
  },
];
