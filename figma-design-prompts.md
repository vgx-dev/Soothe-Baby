# Soothe-Baby — Figma デザインプロンプト集

赤ちゃん向けタッチゲームアプリ「Soothe-Baby」のUIをFigmaでデザインするためのプロンプト集です。

---

## アプリ概要

| 項目 | 内容 |
|------|------|
| 対象 | 生後3ヶ月〜2歳の乳幼児 |
| 用途 | 保護者がスマホを渡して赤ちゃんをあやす |
| 操作 | タップで形（star / circle / triangle / square）をスポーン。物理演算で画面内を浮遊・バウンド |
| デバイス | スマートフォン縦持ち（portrait lock）|
| 技術 | HTML Canvas + Matter.js + PWA |

---

## カラーパレット

```
背景        #A4C2F4  (ライトブルー)
アクセント  #1A73E8  (Googleブルー)
ボタン面    #E8F0FE  (薄いブルー)
ボタン押下  #D2E3FC
閉じるボタン #F1F3F4
テキスト    #333333
サブテキスト #5F6368
エラー      #EA4335

オブジェクト色
  yellow  rgba(255, 210,  80, 1)
  pink    rgba(255, 110, 140, 1)
  skyblue rgba( 80, 190, 255, 1)
  green   rgba(120, 225, 110, 1)
  orange  rgba(255, 165,  60, 1)
  purple  rgba(185, 130, 255, 1)
  teal    rgba( 80, 225, 210, 1)

パーティクル色
  #FF6B81 #1DD1A1 #FECA57 #54A0FF #FF9F43 #5F27CD #FF9FF3 #48DBFB
```

---

## 画面一覧とFigmaプロンプト

### 1. ゲームメイン画面（スタート前）

**プロンプト:**
```
Design a full-screen mobile baby sensory app background in portrait orientation.
Background: soft light-blue gradient (#A4C2F4 → #C8DAFA), with a subtle dreamy
cloud/bubble texture. Center of screen shows white semi-transparent text
"タップしてね ✨" in bold rounded sans-serif, font-size 28px.
No UI chrome or status bar. Corners are rounded only on the device frame.
Style: soft, pastel, calming — like a baby toy.
```

---

### 2. ゲームメイン画面（プレイ中）

**プロンプト:**
```
Design a full-screen mobile canvas game screen for infants.
Background: same soft light-blue as the start screen.
Floating on screen: 3–5 large cartoon shapes — a yellow star (★), pink circle,
sky-blue triangle, green square — each with a glowing drop-shadow matching their
color, softly rotating and bouncing around. Each shape is ~80px in a 390px wide
viewport. White semi-transparent motion-trail streaks follow each shape.
Colorful confetti burst particles (circles, squares, mini-stars in
#FF6B81 / #FECA57 / #54A0FF / #1DD1A1) scatter from recent tap points with
ripple ring effects. Top-left corner has a tiny invisible tap zone (no visible
indicator). Style: vibrant, playful, high contrast, no UI text.
```

---

### 3. 親メニュー (Parent Menu)

**プロンプト:**
```
Design a centered modal dialog for a parental settings menu on mobile.
Background: full-screen frosted glass overlay (white 80% opacity + blur 5px).
Modal card: white, border-radius 20px, padding 40px, min-width 250px,
soft box-shadow (0 10px 40px rgba(0,0,0,0.15)).
Contents (top to bottom):
  - Title "Parent Menu" — 22px, bold, color #333
  - Button "Reset Game" — full width, height 56px, border-radius 12px,
    background #E8F0FE, text #1A73E8, font-size 18px bold
  - Button "Sound: ON"  — same style as Reset
  - Button "Close"      — same width/height, background #F1F3F4, text #5F6368
Button spacing: 15px between each. No border. Tap state: background #D2E3FC.
Style: clean, minimal, iOS-native-like, friendly.
```

---

### 4. PINダイアログ

**プロンプト:**
```
Design a PIN entry dialog overlay for a baby-lock parental gate on mobile.
Background: full-screen dark overlay (black 50% opacity + blur 8px).
Dialog card: white, border-radius 24px, padding 32px 24px, min-width 300px,
box-shadow (0 10px 40px rgba(0,0,0,0.3)).
Contents:
  - Title "PIN" — 20px, bold, #333, margin-bottom 24px
  - 4 dots in a row, gap 20px:
      empty dot: 20×20px circle, border 2px solid #ccc, transparent fill
      filled dot: same size, solid #1A73E8 fill + border
      error dot: solid #EA4335 fill + border
  - 3×4 keypad grid, gap 12px:
      digit keys 1–9, 0: padding 18px, font-size 22px bold, border-radius 14px,
      background #E8F0FE, color #1A73E8
      cancel key ✕: background #F1F3F4, color #EA4335
      backspace ⌫: background #F1F3F4, color #5F6368
Show two states side by side: (A) normal — 2 dots filled,
(B) error — all 4 dots red, dialog slightly offset to show shake animation start.
Style: secure but friendly, same aesthetic as parent menu.
```

---

### 5. PINエラーアニメーション（コンポーネント仕様）

**プロンプト:**
```
Create an animation spec for a PIN shake error in Figma Smart Animate.
Frames:
  Frame 0ms  — dialog at x=0, dots white
  Frame 80ms — dialog at x=-10px, dots turn red (#EA4335)
  Frame 160ms — dialog at x=+10px
  Frame 240ms — dialog at x=-8px
  Frame 320ms — dialog at x=+8px
  Frame 400ms — dialog at x=0, dots reset to empty (transparent)
Easing: ease-in-out. Duration total: 400ms.
Attach a "pin-shake" variant label to the error state frame.
```

---

### 6. オブジェクト（形）コンポーネント

**プロンプト:**
```
Design 4 large playful floating shape components for a baby sensory app.
Each shape is ~80px in size, on transparent background.
Shapes: ★ star, ● circle, ▲ triangle, ■ square.
Each has:
  - Flat cartoon fill in its assigned color (yellow / pink / sky-blue / green)
  - Color-matched outer glow: blur 20px, opacity 80%
  - Subtle white specular highlight (small ellipse, top-left, opacity 40%)
  - Rounded/soft edges where applicable
Export as individual components with variants:
  Default | Hover (scale 1.05) | Tapped (scale 0.9, brighter glow).
Name each: Shape/Star, Shape/Circle, Shape/Triangle, Shape/Square.
```

---

### 7. スプラッシュ / アイコン

**プロンプト:**
```
Design a PWA app icon for "Soothe Baby" (512×512px, safe area 400×400px).
Background: radial gradient from #C8DAFA (center) to #7BAEE8 (edge), circle mask.
Center: a smiling crescent moon emoji-style illustration in cream/yellow,
surrounded by 4 tiny floating shapes (star, circle, triangle, square)
in the brand colors, orbiting the moon in a gentle arc.
Style: Duolingo-level polish, soft, rounded, no sharp edges, no text.
Also output a 192×192px variant for the manifest maskable icon.
```

---

## デザイントークン（Variables）

Figmaの `Variables` パネルに登録推奨:

```
Color/Brand/Primary       #1A73E8
Color/Brand/PrimaryLight  #E8F0FE
Color/Brand/PrimaryPress  #D2E3FC
Color/Brand/Background    #A4C2F4
Color/Neutral/Surface     #FFFFFF
Color/Neutral/Overlay     rgba(255,255,255,0.8)
Color/Neutral/Muted       #F1F3F4
Color/Neutral/TextPrimary  #333333
Color/Neutral/TextSub     #5F6368
Color/State/Error         #EA4335

Radius/Card    20
Radius/Button  12
Radius/PIN     24

Shadow/Card    0 10px 40px rgba(0,0,0,0.15)
Shadow/PIN     0 10px 40px rgba(0,0,0,0.30)

Font/Title     22px / Bold / #333333
Font/Button    18px / Bold / Brand/Primary
Font/PIN-Title 20px / Bold / #333333
Font/PIN-Key   22px / Bold / Brand/Primary
```

---

## コンポーネント構成（推奨）

```
📁 Soothe-Baby
 ├── 🖼 Screens
 │   ├── 01_Game_Start
 │   ├── 02_Game_Playing
 │   ├── 03_Parent_Menu
 │   ├── 04_PIN_Default
 │   ├── 04_PIN_Filled
 │   └── 04_PIN_Error
 ├── 🧩 Components
 │   ├── Button/Primary
 │   ├── Button/Neutral
 │   ├── PIN/Dot (empty / filled / error)
 │   ├── PIN/Key (digit / cancel / backspace)
 │   ├── Shape/Star
 │   ├── Shape/Circle
 │   ├── Shape/Triangle
 │   └── Shape/Square
 └── 🎨 Styles
     ├── Colors (→ Variables)
     ├── Shadows
     └── Text Styles
```

---

## アクセシビリティ注意事項

- タッチターゲットは最小 **48×48px** を確保（PIN キーは 56×56px 推奨）
- ゲーム画面は `prefers-reduced-motion` に関係なく常にアニメーションON（赤ちゃん向けのため）
- コントラスト比: ボタンテキスト `#1A73E8` on `#E8F0FE` は AA 適合（3.5:1 以上）
- 親メニューのフォントサイズは 18px 以上を維持（疲れた保護者が使うため）
