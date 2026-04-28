# Requirement
Create a minimum react vite application for Emirates NBD with three pages.
1. Login page - this will have only brand logo and Login with UAE Pass control
2. Home page - This page will have static content in three sections and a chat input control
3. Chat page - this is normal chat page but with static dummy replies

## Explanantion
We need to create a static react+vite app for a mobile view. This app should only support mobile device view and on desktop also, it should open in mobile device dimensions.
This app will have 3 pages and a very basic flow
1. When app starts, it lands on login page. This login page will only have branding of ENBD and a control to login with UAE pass. Once user clicks on the login control, it will show a dummy static spinner for a while and then navigate to home page
2. On home page, we have four sections
    1. Explore products section will have standard banking products offered to customers. In this section, the items will be styled like facebook stories. Use dummy stock images from free stock image sites to be used here and show 3-5 products. This section will be horizontally scrollable
    2. Recommended for you section will have customer specific offers like balance conversion, installment plans, funds transfer etc. This section items will be horizontally wide and will use free stock images according to product or service. Show 3-5 services here. This section will be horizontally scrollable
    3. Recent service request section will show 3 static service requests with dummy data and values. Clicking on service will open a details modal showing service request details and timeline
    4. Chat with agent section will always stick to bottom even above page is scrollable. In this section, we show the input field with some dummy text prefilled and a submit button. On submit, it will navigate to Chat page
3. Chat Page is simple chat UI where customer can send message and receive reply. The chat input field will remain sticky at the bottom and conversation area will be scrollable. The chat will start with first message from user which was sent on Home page. Also, we will have some dummy replies configured based in input message keywords.

## Design rules
- This will mimic a modern iOS app. There will be a header which will always fixed at top. On header, we have brand icon on left and a static menu button on right. Once user proceeds from login page, brand icon will be replaced by back button.
- The background of app should be a modern gradient as per theme color and should apply on all pages
- Typography should be matched with modern iOS app fonts. Install relevant fonts if required.
- Check `logos` folder for brand assets and put them on appropriate places.
- For stock images, check free images from [unsplas](https://unsplash.com/), https://www.pexels.com/ or https://www.freepik.com/photos etc.
- Check `screenshot` folder to see the photos taken for inspiration on design and layout. Use exact same layout and replicate similar pages and components.

## Color palette
We need to use the following color palette to design the application.

Primary: `#072447`
Secondary: `#4C515A`
Accent: `#2765FF`
Light: `#D9D9D6`
Secondary Light: `#9295A0`

## Deployment
This will be built and deployed as github page site on this repo: git@github.com:ahmadsamii/temp-demo.git
Make sure to add appropriate configs and build steps to deploy this on github pages. Also, make sure the routing and navigation handling is done properly 

# Rules
- The app should be responsive and work well on all devices as webview
- Implement all proper configs to enhance the webview experience on devices.
- The header and chat input footer should remain fixed on top and bottom respectively while middle page can scroll.
- Branding and styling should be modern, corporate friendly and should give a solid trust. Dont add any soft styling
- DON'T generate any summary or progress documents. Only keep project memory updated.
- Ask series of questions if you need more clarity. Only proceed once you have full understanding
    