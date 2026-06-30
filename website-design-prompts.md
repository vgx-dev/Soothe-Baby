# Soothe-Baby — Webサイト（LP）デザインプロンプト集

赤ちゃん向けタッチゲームアプリ「Soothe-Baby」のマーケティングサイト（ランディングページ）を
Figmaでデザインするためのプロンプト集です。Product Hunt 上場に合わせた公開を想定しています。

カラーパレット・デザイントークンはアプリ本体（`figma-design-prompts.md`）と統一しています。

---

## サイト概要

| 項目 | 内容 |
|------|------|
| 目的 | Product Hunt ローンチに合わせたプロダクト紹介サイト（1ページLP） |
| ターゲット | 0〜2歳児の保護者、Product Hunt閲覧者（英語圏中心） |
| トーン | 優しい・安心感・遊び心（アプリ本体と同じ世界観） |
| 言語 | 英語メイン（PH掲載のため）。日本語版は別途切り替え想定 |
| デバイス | デスクトップ優先でデザイン、モバイルは同一トークンでレスポンシブ |
| 技術 | 未定（Figmaでビジュアル確定後、実装スタックを選定） |

---

## カラーパレット（アプリと共通）

```
背景        #A4C2F4  (ライトブルー)
背景(LP用淡色) #F4F8FF  (セクション背景の切り替えに使用)
アクセント  #1A73E8  (Googleブルー)
ボタン面    #E8F0FE
ボタン押下  #D2E3FC
テキスト    #333333
サブテキスト #5F6368
エラー      #EA4335

オブジェクト色（装飾用）
  yellow  #FFD250
  pink    #FF6E8C
  skyblue #50BEFF
  green   #78E16E
  orange  #FFA53C
  purple  #B982FF
  teal    #50E1D2
```

---

## ページ構成とFigmaプロンプト

### 1. Hero セクション

**プロンプト:**
```
Design a desktop landing page hero section (1440×800px) for a baby sensory
touch app called "Soothe Baby".
Left half (55%): Headline "Calm your baby in one tap." — 56px bold rounded
sans-serif, color #333. Subheadline below, 20px, #5F6368: "A simple,
soothing touch game that turns screen time into calm time — for babies
3 months to 2 years." Two CTA buttons side by side: primary "Try it free"
(background #1A73E8, white text, border-radius 12px, height 56px,
padding 0 32px) and secondary "Watch demo" (outline style, border 2px
#1A73E8, text #1A73E8, same size). Below buttons, a small Product Hunt
badge placeholder (240×52px) and a one-line trust note "Loved by parents
on Product Hunt 🎉".
Right half (45%): A mobile phone mockup (390×844, portrait) showing the
app's playing screen — soft light-blue background (#A4C2F4) with floating
star/circle/triangle/square shapes (yellow/pink/skyblue/green) and confetti
particle bursts, glowing drop shadows. Phone mockup has a subtle floating
animation feel (slight rotation -4deg) and soft shadow beneath it.
Background of whole hero: gradient #F4F8FF → white, with faint blurred
pastel circle shapes (yellow/pink/skyblue) scattered behind the phone for
depth, opacity 30%.
Style: warm, clean, SaaS-meets-baby-app, generous whitespace, rounded
corners everywhere, no sharp edges.
```

---

### 2. 課題提起セクション（Problem / Empathy）

**プロンプト:**
```
Design a centered text section (1440×400px) on white background.
Small eyebrow label above headline: "WHY SOOTHE BABY" — 14px, bold,
letter-spacing 1px, color #1A73E8, background #E8F0FE, padding 6px 16px,
border-radius 20px (pill shape).
Headline below, centered, 36px bold, #333, max-width 700px:
"Fussy moments happen. You shouldn't need a screen full of ads to fix them."
Subtext, 18px, #5F6368, max-width 600px, centered:
"Soothe Baby is ad-free, distraction-free, and designed with pediatric
sensory principles in mind — just gentle motion and color, nothing else."
Style: calm, reassuring, lots of negative space, no imagery — typography-led.
```

---

### 3. デモ／スクリーンショットショーケース

**プロンプト:**
```
Design a product showcase section (1440×900px), background #F4F8FF.
Centered headline "See it in action" — 36px bold, #333.
Below: 3 phone mockups (390×844 each, scaled down to ~280px wide) arranged
in a horizontal row with slight overlap and alternating rotation
(-6deg, 0deg, +6deg), each on a soft drop shadow.
Mockup 1: Start screen — light blue background, centered text "Tap to begin ✨".
Mockup 2: Playing screen — multiple glowing shapes mid-bounce with motion
trails and confetti bursts from a recent tap.
Mockup 3: Parent Menu modal open — frosted glass overlay with
"Reset Game" / "Sound: ON" / "Close" buttons visible.
Under each mockup, a short caption (16px, #5F6368, centered):
"Gentle start" / "Endless tapping fun" / "Parental controls built in".
Style: playful but organized, consistent shadow direction, premium app
store feel.
```

---

### 4. 機能（Features）セクション

**プロンプト:**
```
Design a 3-column feature grid section (1440×500px), white background.
Centered headline above grid: "Built for babies. Trusted by parents." —
36px bold, #333.
Each column (3 total), width ~360px, centered text:
  Column 1 — Icon: glowing star shape (#FFD250) in a soft circle badge
    (72px, background #E8F0FE). Title "No ads, ever" (20px bold, #333).
    Body "A completely closed, distraction-free experience." (16px, #5F6368).
  Column 2 — Icon: glowing circle shape (#50BEFF) badge. Title "Parent lock
    PIN". Body "A simple 4-digit PIN keeps settings safe from curious hands."
  Column 3 — Icon: glowing triangle shape (#78E16E) badge. Title
    "Sensory-friendly design". Body "Soft colors, gentle physics, and calm
    sound designed around infant attention spans."
Spacing: 60px gutter between columns, icons centered above text.
Style: airy, consistent icon badge sizing, rounded corners, soft shadows.
```

---

### 5. 使い方（How it works）セクション

**プロンプト:**
```
Design a horizontal 3-step "how it works" section (1440×450px),
background #A4C2F4 (brand background blue), white text/icons for contrast.
Centered headline: "Three taps to calm" — 36px bold, white.
3 steps in a row, each with a white circular number badge (56px, bold
number in #1A73E8 on white) above a short title and description in white:
  Step 1: "Open the app" — "Hand your phone to your baby, no setup needed."
  Step 2: "They tap, shapes bounce" — "Stars, circles, triangles burst into
    color and motion with every touch."
  Step 3: "Lock it down" — "Use the PIN-protected parent menu to reset or
    mute anytime."
Connect the 3 steps with a thin dashed white line (opacity 40%) running
horizontally behind the number badges.
Style: high contrast against blue background, friendly, confident.
```

---

### 6. Product Hunt / ソーシャルプルーフ セクション

**プロンプト:**
```
Design a social proof section (1440×350px), background white.
Centered content: a large Product Hunt badge placeholder (250×54px,
"Featured on Product Hunt" style) at the top, centered.
Below it, headline "Join parents already loving Soothe Baby" — 28px bold,
#333.
Below headline: a row of 3 testimonial cards (each 360px wide, white
background, border-radius 16px, soft shadow 0 10px 30px rgba(0,0,0,0.08),
padding 24px). Each card: 5 star icons in #FFD250 at top, italic quote
text (16px, #333), and below a small circular avatar placeholder (40px)
with name + role text (14px bold name, 13px #5F6368 role), e.g.
"Aya T. — mom of a 9-month-old".
Style: trustworthy, warm, not overly corporate — keep avatars illustrated/
cartoon style to match the brand rather than stock photos.
```

---

### 7. 最終CTAセクション

**プロンプト:**
```
Design a full-width closing CTA section (1440×400px), background gradient
#1A73E8 → #4A90F0, white text.
Centered headline "Ready for calmer moments?" — 40px bold, white.
Subtext below, 18px, white 85% opacity: "Free to try. No sign-up required
to start playing."
Primary button below, centered: "Try Soothe Baby now" — white background,
text #1A73E8, border-radius 12px, height 56px, padding 0 40px, bold 18px,
soft shadow.
Decorative elements: faint floating shape outlines (star/circle/triangle,
white 15% opacity) scattered in background corners for texture, matching
the in-app shapes.
Style: confident, warm closing moment, mirrors hero gradient direction.
```

---

### 8. フッター

**プロンプト:**
```
Design a simple footer section (1440×200px), background #333333, white/
muted text.
Left: small Soothe Baby logo + wordmark (white).
Center or right: link columns —
  "Product": Features, How it works, FAQ
  "Company": About, Contact, Privacy Policy
Bottom row, full width, thin top border (white 10% opacity):
  Left: "© 2026 Soothe Baby. All rights reserved."
  Right: small social icons (Twitter/X, Instagram, Product Hunt) in
  white, 24px, opacity 70%, hover opacity 100%.
Style: minimal, unobtrusive, consistent with rest of brand.
```

---

### 9. OGP / SNSシェア画像

**プロンプト:**
```
Design a social share / OGP image (1200×630px) for "Soothe Baby".
Background: soft gradient #A4C2F4 → #C8DAFA with faint cloud texture.
Left-center: bold wordmark "Soothe Baby" (white, 64px bold rounded
sans-serif) with tagline below "Calm your baby in one tap." (28px, white
85% opacity).
Right side: 3-4 glowing floating shapes (star yellow, circle pink, triangle
skyblue) mid-bounce with motion trails, matching in-app visual style.
Bottom-right corner: small Product Hunt badge placeholder.
Style: must read clearly at small thumbnail size — bold contrast, no fine
text, consistent with app icon and hero section.
```

---

## デザイントークン（Variables）— アプリと共有

```
Color/Brand/Primary       #1A73E8
Color/Brand/PrimaryLight  #E8F0FE
Color/Brand/PrimaryPress  #D2E3FC
Color/Brand/Background    #A4C2F4
Color/LP/SectionAlt       #F4F8FF
Color/Neutral/Surface     #FFFFFF
Color/Neutral/TextPrimary #333333
Color/Neutral/TextSub     #5F6368
Color/State/Error         #EA4335

Radius/Card    16
Radius/Button  12
Radius/Pill    20 (full)

Shadow/Card    0 10px 30px rgba(0,0,0,0.08)
Shadow/Hero    0 20px 60px rgba(0,0,0,0.12)

Font/H1        56px / Bold / #333333  (Hero見出し)
Font/H2        36px / Bold / #333333  (セクション見出し)
Font/Body      18px / Regular / #5F6368
Font/Button    18px / Bold / White or Brand/Primary
```

---

## コンポーネント構成（推奨）

```
📁 Soothe-Baby Website
 ├── 🖼 Sections
 │   ├── 01_Hero
 │   ├── 02_Problem_Empathy
 │   ├── 03_Showcase
 │   ├── 04_Features
 │   ├── 05_HowItWorks
 │   ├── 06_SocialProof_ProductHunt
 │   ├── 07_FinalCTA
 │   └── 08_Footer
 ├── 🧩 Components
 │   ├── Button/Primary
 │   ├── Button/Secondary-Outline
 │   ├── Badge/Pill-Label
 │   ├── Card/Testimonial
 │   ├── Card/Feature
 │   └── Mockup/Phone-Frame
 └── 🎨 Styles
     ├── Colors (→ Variables, shared with app)
     ├── Shadows
     └── Text Styles
```

---

## 制作時の注意点

- ヒーローのフォンモックアップ内画面は、アプリ本体の `figma-design-prompts.md`
  内「1. ゲームメイン画面」「2. ゲームメイン画面（プレイ中）」のプロンプトで
  生成した画面をそのまま流用すると一貫性が出ます。
- Product Hunt の公式バッジは規定サイズ・規約があるため、デザイン段階では
  プレースホルダーとして扱い、実装時に公式の埋め込みコード/画像に差し替える。
- 英語コピーは仮テキストです。最終的なローンチ文言が決まり次第差し替えてください。
- レスポンシブ（モバイル幅375px）は、各セクションを縦積みにし、Hero の
  フォンモックアップを上、テキストを下に配置する構成を別途用意してください。
