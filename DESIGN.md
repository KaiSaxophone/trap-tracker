# DESIGN.md — Walica（ワリカ）

> https://walica.jp のデザイン仕様書。旅行の割り勘計算サービス。
> 実サイトの computed style 実測（2026-09-05 取得）に基づく。一部（背景色の細部・影の値）は
> スクリーンショット観察による推定値であり、その旨を明記する。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: コーラル（サーモンピンク寄りのオレンジ）をアクセントカラーに据えた、白基調のやわらかく親しみやすいコンシューマー向けデザイン。ダイキンのような硬い企業サイトとは対照的に、丸み・余白・イラストで「使いやすそう」という第一印象を作る
- **密度**: body 15px / line-height ×1.6。見出しはウェイト900（極太）でインパクトを出しつつ、本文は軽やか
- **キーワード**: コーラル、丸み（pill/大きめradius）、Noto Sans JP、柔らかい影、余白多め、フレンドリー
- **特徴**:
  - **アクセントカラーはコーラル `#ee7b67`** のみ。ダイキンのようなブランドカラーの使い分け（2色以上の役割分担）は行わず、単色アクセント＋濃いグレーのテキストというシンプルな2トーン構成
  - Webフォント **Noto Sans JP**（Google Fonts）を使用。システムフォント縛りはない
  - ボタンは完全な丸み（pill, radius 9999px）、カード・セクションは大きめの角丸（12〜24px）
  - 影は最小限〜控えめ（濃い影・強いドロップシャドウは使わない）
  - ダークモード非対応

---

## 2. Color Palette & Roles

> 実測値。一部（背景グレー・ホバー色）は未測定のため推定値（Estimated）と明記。

### Brand / Accent

- **Coral**（`#ee7b67`）: 唯一のブランド・アクセントカラー。CTAボタン・見出しアクセント・リンク・アクティブ状態など、目立たせたい箇所全般に使う

### Neutral

| Token | hex | 役割 | 備考 |
|-------|-----|------|------|
| Text Primary | `#1f2937` | 見出し・本文テキスト | 実測 |
| Text Secondary | `#6b7280` | 補助テキスト・ラベル | Estimated（Text Primaryと調和するグレー） |
| Border | `#e5e7eb` | 区切り線・input border | Estimated |
| Surface (page bg) | `#f7f7f8` | ページ背景（カードとの対比用） | Estimated |
| White | `#ffffff` | カード・コンテンツ背景 | 実測 |

### Semantic

- **Danger**: 未測定。推奨 `#e0524a`（コーラルと調和する赤寄りトーン）
- **Success**: 未測定。推奨 `#3fb37f` 程度

---

## 3. Typography Rules

### 3.1 フォント

```css
font-family: "Noto Sans JP", sans-serif;
```

Google Fonts経由でWebフォントを読み込む（`https://fonts.googleapis.com` から取得。システムフォント縛りはない）。

### 3.2 文字サイズ・ウェイト階層

> 実測値（トップページ）＋本アプリ向けの適用ルール

| Role | Size | Weight | Line Height | Color | 備考 |
|------|------|--------|-------------|-------|------|
| Hero H1 | 30px | 900 | ×1.3 | `#ee7b67` | walicaトップの見出し（実測） |
| H2 | 22px | 900 | ×1.3 | `#1f2937` | セクション見出し（実測） |
| ページ見出し（本アプリのh1） | 22px | 900 | ×1.3 | `#1f2937` | 各ページタイトル用に適用 |
| Body | 15px | 400 | ×1.625 | `#1f2937` | 本文（実測） |
| Small | 13px | 400 | ×1.5 | `#6b7280` | 補足・ラベル | Estimated |

### 3.3 行間・字間

- line-height はおおむね ×1.3（見出し）〜×1.6（本文）
- letter-spacing の明示指定なし（normal）

---

## 4. Component Stylings

### Buttons

| Type | BG | Text | Border | Radius | Weight | 備考 |
|------|-----|------|--------|--------|--------|------|
| Primary | `#ee7b67` | `#ffffff` | none | `9999px`（pill） | 600 | 実測（「はじめる」ボタン） |
| Secondary | `#ffffff` | `#ee7b67` | `1px solid #ee7b67` | `9999px` | 600 | Estimated（Primaryの反転） |
| Danger | `#ffffff` | `#e0524a` | `1px solid #e0524a` | `9999px` | 600 | Estimated |

- ボタンpadding: 実測で `16px 0`（横幅いっぱいのCTA）。本アプリの通常ボタンは `10px 24px` 程度に調整してよい
- 影なし（`box-shadow: none`、実測）

### Cards / Sections

- 白背景カード、角丸 `24px`（大きめセクション）〜`12px`（中サイズ要素）
- 影は最小限（`0 2px 8px rgba(0,0,0,0.06)` 程度の非常に薄いものに留める。Estimated）
- ページ背景は薄いグレー `#f7f7f8`、その上に白いカードを浮かせる構成

### Border Radius スケール

- `9999px`: ボタン（pill）
- `24px`: 大きいカード・セクション
- `12px`: 中サイズ要素（フォームグループ等）
- `8px`: 小さい要素（バッジ・input等）

---

## 5. Layout Principles

- ページ背景は薄いグレー、コンテンツは白カードで浮かせる
- 中央寄せ・最大幅を持たせ、余白を惜しみなく使う
- セクション間の区切りは背景色の切り替え（白 / 薄グレー）で表現し、罫線は最小限

---

## 6. Depth & Elevation

- 影は控えめ。強いドロップシャドウ・多層シャドウは使わない
- カードの境界は「影」よりも「背景色のコントラスト（白 on 薄グレー）」で表現するのが基本
- 角丸を統一的に大きくすることで柔らかさを演出する（影に頼らない）

---

## 7. Do's and Don'ts

### Do's（推奨）

- アクセントカラーはコーラル `#ee7b67` に統一する（複数のブランドカラーを持たない）
- ボタンは pill 形状（radius 9999px）を基本とする
- カード・セクションは大きめの角丸（12〜24px）にする
- 見出しはウェイト900の太字でインパクトを出す
- Noto Sans JP を読み込んで使う

### Don'ts（非推奨）

- 強い影・多層シャドウを使わない
- 角丸を小さくしすぎない（walicaの柔らかさが失われる）
- コーラル以外の強いブランドカラーを追加しない
- letter-spacingを詰めない（normalのまま）

---

## 8. Responsive Behavior

- ブレークポイント: 実測未取得。本アプリでは768px（タブレット）・480px（モバイル）を踏襲する
- モバイルでもボタン・カードの丸みは維持する

---

## 9. Agent Prompt Guide

### 必須トークン

```css
:root {
  --accent: #ee7b67;
  --accent-hover: #e2604a;
  --danger: #e0524a;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
  --surface: #f7f7f8;
  --bg-white: #ffffff;
  --radius-pill: 9999px;
  --radius-lg: 24px;
  --radius-md: 12px;
  --radius-sm: 8px;
}
```

### 生成時の注意点

1. **アクセントはコーラル1色**: 複数ブランドカラーの使い分け（ダイキン的な発想）はしない
2. **ボタンはpill形状**: `border-radius: 9999px` を基本にする
3. **Noto Sans JPを読み込む**: `<link>` または `@import` でGoogle Fontsから取得してよい
4. **影は最小限**: 濃い影を使わず、白カード＋薄グレー背景のコントラストで階層を表現する
5. **見出しは極太（900）**: ウェイトでメリハリをつける
