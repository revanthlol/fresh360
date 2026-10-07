# Fresh 360 hero and brand slideshow images

Generate four images, all landscape 16:9 at the highest available resolution (ideally at least 2560 × 1440). These are photography assets. Website headings, descriptions and buttons will be rendered in HTML, not baked into the images.

Use the final product photographs as references, not the earlier blank bottle renders. Preserve the bottle silhouette, cap, glass, drink colour, brand spelling, flavour name and label artwork from each reference. Ingredient props must stay with their corresponding product. Do not add ingredients to Fizzo imagery: its products are artificially flavoured beverages.

## 1. Homepage hero

Attach these three references:
- Juicera Citrovit
- Fruizy Purify Fizz
- Fizzo Blue Mojito

Prompt:

Create one photorealistic commercial beverage photograph for the Fresh 360 homepage using all three attached product images as exact product references. Reference 1 is Juicera Citrovit, reference 2 is Fruizy Purify Fizz, and reference 3 is Fizzo Blue Mojito. Include exactly one bottle of each, with its own original label, cap, glass shape, liquid colour and physical proportions intact. Juicera must retain its gold screw cap and sloping shoulders; the other bottles must retain their own reference geometry and closures. Do not exchange labels, merge brands, invent flavours, redraw packaging or give all three bottles a generic identical shape. Remove the original backgrounds and arrange the three products together in a believable new scene. Landscape 16:9. Leave the left 45% as quiet pale ivory and light sage negative space for website text. Arrange the bottles within the right 50%, keeping all caps, labels and bases visible, with comfortable margins on the top, right and bottom. Use a slightly staggered triangular arrangement, minimal overlap and separate readable labels. Place them on a continuous pale limestone surface, with subtle wet reflections, soft natural daylight from the upper left, delicate condensation, convincing contact shadows and a softly blurred sage background. Let the orange, deep red and blue drinks provide the colour. Keep props minimal: a small orange wedge beside the Juicera bottle and a beetroot slice beside the Fruizy bottle, plus a few pieces of ice near Fizzo. Keep the entire left text area free of products, props, strong shadows and busy texture. No added headlines, floating logos, people, extra bottles, medical claims, artificial glow, excessive splashes or watermark. Premium, tactile, realistic photography with coherent lighting across all three products.

## 2. Juicera brand slide

Attach these three references:
- Juicera Citrovit
- Juicera Elixir
- Juicera Almond Delight

Prompt:

Create one photorealistic commercial photograph for a Juicera website brand slide using the three attached product photographs as exact packaging references. Include exactly three bottles: Citrovit, Elixir and Almond Delight. Preserve each reference's gold metal cap, neck and shoulder proportions, straight lower glass body, thick glass base, label placement, exact label artwork and drink colour. Do not invent a different bottle shape or replace almond milk with transparent juice. Landscape 16:9. Leave the left 40% quiet, pale ivory and softly lit for website copy. Compose the bottles as a balanced group within the right 55%, all caps and bases fully visible, labels facing the camera and readable, with minimal overlap and generous outer margins. Place Citrovit slightly forward, Elixir behind to one side and Almond Delight behind to the other, using the same pale limestone surface and soft upper-left daylight as the Fresh 360 hero. Add restrained ingredient details close to their matching bottles: orange and carrot near Citrovit, pomegranate near Elixir, almonds and a tiny dish of saffron threads near Almond Delight. Use a softly blurred sage background, realistic glass reflections, delicate condensation and grounded shadows. Fresh, calm and tactile, with natural colour rather than exaggerated saturation. No ingredient props in the left text area, no additional bottles, headlines, floating logos, health claims, certifications, people or watermark. Reproduce the supplied product artwork rather than designing new labels.

## 3. Fruizy brand slide

Attach all four references:
- Fruizy Citrovit Fizz
- Fruizy Elixir Fizz
- Fruizy Purify Fizz
- Fruizy Refresh Fizz

Prompt:

Create one photorealistic commercial photograph for a Fruizy website brand slide using all four attached product photographs as exact packaging references. Include exactly four bottles: Citrovit Fizz, Elixir Fizz, Purify Fizz and Refresh Fizz. Preserve every reference's bottle silhouette, distinctive neck details, closure, glass base, fill level, liquid colour, brand spelling, flavour text and complete label design. Use the brand name exactly as printed in the supplied references; do not silently respell it. Do not substitute the gold-cap Juicera bottle or invent new packaging. Landscape 16:9. Leave the left 40% as clean pale ivory negative space for website copy. Arrange the bottles in a loose, shallow arc within the right 55%, with two slightly forward and two behind, all caps and bases visible and all front labels readable. Keep overlap minimal and retain comfortable margins. Use the same pale limestone surface, upper-left daylight and softly blurred sage background as the other Fresh 360 images, with a slightly cooler teal cast in the background only. Add a few pieces of clear ice and small wet highlights around the bases. If including fruit props, reproduce only ingredient props already present in the corresponding product references, keeping them sparse and below the labels. Convey refreshment through crisp reflections and subtle condensation rather than a huge splash. No extra bottles, invented fruit combinations, added slogans, floating logos, health claims, people, artificial glow or watermark.

## 4. Fizzo brand slide

Attach these four references:
- Fizzo Lime
- Fizzo Blue Mojito
- Fizzo Chilli Mango
- Fizzo Root Beer

Prompt:

Create one photorealistic commercial photograph for a Fizzo website brand slide using the four attached product photographs as exact packaging references. Include exactly four bottles: Lime, Blue Mojito, Chilli Mango and Root Beer. Preserve every bottle's reference geometry, neck details, glass base, closure, fill level, liquid colour, Fizzo wordmark, flavour name and label artwork. Do not replace the supplied bottles with generic soda packaging, cans or gold-cap juice bottles. Landscape 16:9. Leave the left 40% quiet and pale ivory for website copy. Arrange the four bottles within the right 55% in a confident, slightly staggered group, with two forward and two behind, minimal overlap, all labels readable, all caps and bases visible, and generous outer margins. Use the same pale limestone surface, coherent upper-left daylight and softly blurred sage background as the other Fresh 360 images. Introduce a restrained warm amber cast behind the bottles, while their individual liquid and label colours remain faithful to the references. Add a few clear ice pieces, delicate condensation and realistic wet reflections. Keep the energy in the product colours and crisp photography. Do not add fruit, herbs or ingredient arrangements: these are artificially flavoured beverages. No invented health or natural-juice claims, altered label declarations, added slogans, extra bottles, beer mugs, alcohol imagery, people, glow effects or watermark.

## Planned implementation after the images are supplied

- Replace the current hero image, preserving the left-side HTML heading and actions. On mobile, display the bottle group beneath the text using a deliberate crop, rather than squeezing the desktop composition behind the heading.
- Replace the three brand cards with three image-led slides, ordered Juicera, Fruizy, Fizzo.
- On desktop, use a sticky image stage with three short copy panels in normal document flow. As each panel enters the active area, crossfade to its corresponding image and update a three-position indicator. Keep transitions short and avoid wheel interception, forced scroll snapping or long pinned sections.
- Each panel retains the existing CMS copy and Explore action, including the current single-page product filter behavior.
- Provide explicit brand selectors so users can reach a slide without scrolling through all three. Keyboard selection must work without waiting for animation.
- On mobile and with reduced motion, render three ordinary stacked image-and-copy sections. No autoplay or sticky takeover.
- Optimise the final source assets for the actual display sizes. The temporary public/images directory remains outside the current commit.
