# Customer List Sorting Project

This project demonstrates sorting functionality for a customer list table with enhanced user interaction features. It allows users to sort the table by various columns and provides tooltips for guidance. Additionally, it includes sound feedback using the Web Speech API.

## Features

- **Table Sorting:** Users can sort the table by clicking on column headers. Click once to sort in ascending order, and click again to sort in descending order.

- **Tooltips:** Hover over the question mark icon next to each column header to see a tooltip that describes how to sort by that column.

- **Sound Feedback:** When sorting a column, the project provides sound feedback using the Web Speech API, announcing the sorting action and column name.

## How to Use

1. Clone this repository to your local machine.

2. Open the `index.html` file in a modern web browser.

3. Click on the column headers to sort the table.

4. Hover over the question mark icons to see tooltips.

## Preloaded Voice

The project uses the Web Speech API with a preloaded voice. To set your preferred voice, update the `preloadVoice` function in `script.js` with the name of your desired voice.

```javascript
function preloadVoice() {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        selectedVoice = voices.find(voice => voice.name === 'Your Selected Voice Name'); // Replace with the name of your desired voice
    }
}
```

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.
