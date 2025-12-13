# Contact Form Setup

The contact form sends emails to `mail@darrenfong.net` using Web3Forms API.

## Setup Instructions

1. Go to [Web3Forms](https://web3forms.com/) and sign up for a free account
2. Create a new form and get your Access Key
3. Add the Access Key to your `.env.local` file:
   ```
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
4. The form will automatically send emails to `mail@darrenfong.net`

## Features

- Client-side validation
- Loading states
- Success/error messages
- Form reset after successful submission
- Sends formatted emails with sender's information

## API Endpoint

The contact form uses `/api/contact` endpoint which:
- Validates all required fields
- Formats the email content
- Sends via Web3Forms API
- Returns appropriate success/error responses
