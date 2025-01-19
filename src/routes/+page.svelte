<script lang="ts">
  import { onMount } from "svelte";
  import { fetchData } from "../lib/index";
  import { writable } from "svelte/store";

  let selectedSource: App.DataSource = "verbs"; // Default source
  let elements: App.Element[] = [];
  let randomElement: App.Element | null = null;

  // Store for tracking the current selected source
  const dataSource = writable<App.DataSource>("verbs");

  // Fetch elements based on the selected data source
  async function fetchRandomElement() {
    elements = await fetchData(selectedSource);
    changeElement();
  }

  function changeElement() {
    if (elements.length > 0) {
      randomElement = elements[Math.floor(Math.random() * elements.length)];
    }
  }

  onMount(() => {
    fetchRandomElement();
  });

  // Handle source change
  function selectSource(source: App.DataSource) {
    selectedSource = source;
    dataSource.set(source); // Update the selected source
    fetchRandomElement(); // Fetch new elements for the selected source
  }
</script>

<main>
  <div class="button-container">
    <button on:click={() => selectSource("verbs")}>Verbs</button>
    <button on:click={() => selectSource("sentences")}>Sentences</button>
  </div>

  <div class="content">
    {#if randomElement}
    <div class="element">
      <p>{randomElement.norsk}</p>
      <p>{randomElement.english}</p>
    </div>
    {:else}
    <p>Loading...</p>
    {/if}
  </div>

  <button class="next-button" on:click={changeElement} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && changeElement()}>
    NEXT
  </button>
</main>

<style>
  /* Global reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  /* Button container styling */
  .button-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .button-container button {
    padding: 12px 24px;
    font-size: 1.1rem;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .button-container button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  .button-container button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.4);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    margin-bottom: 2rem;
  }

  .element p {
    font-size: 1.6rem;
    margin: 0.6rem 0;
    color: #333;
  }

  @media (min-width: 768px) {
    .element p {
      font-size: 2rem;
    }
  }

  /* Styling for the "Next" button */
  .next-button {
    padding: 14px 32px;
    font-size: 1.3rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .next-button:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  .next-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(40, 167, 69, 0.4);
  }

  .next-button:active {
    background-color: #1e7e34;
  }
</style>
