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
    <button class:active={$dataSource === "verbs"} on:click={() => selectSource("verbs")}>Verbs</button>
    <button class:active={$dataSource === "sentences"} on:click={() => selectSource("sentences")}>Sentences</button>
    <button class:active={$dataSource === "sentences-hard"} on:click={() => selectSource("sentences-hard")}>Sentences+</button>
  </div>

  <div class="content">
    {#if randomElement}
    <div class="element">
      <p class="norsk">{randomElement.norsk}</p>
      <p class="english">{randomElement.english}</p>
    </div>
    {:else}
    <p class="loading">Loading...</p>
    {/if}
  </div>

  <button class="next-button" on:click={changeElement} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && changeElement()}>
    Next
  </button>
</main>

<style>
  :root {
    --primary-color: #4a90e2;
    --secondary-color: #f39c12;
    --background-color: #f0f4f8;
    --text-color: #333;
    --button-text-color: #fff;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: var(--background-color);
    font-family: 'Arial', sans-serif;
  }

  .button-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .button-container button {
    padding: 12px 24px;
    font-size: 1rem;
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 25px;
    transition: all 0.3s ease;
  }

  .button-container button:hover,
  .button-container button.active {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
  }

  .content:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .element {
    text-align: center;
  }

  .norsk {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .english {
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .loading {
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .next-button {
    padding: 14px 32px;
    font-size: 1.3rem;
    background-color: var(--secondary-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .next-button:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .button-container {
      flex-direction: column;
      width: 100%;
    }

    .button-container button {
      width: 100%;
    }

    .norsk {
      font-size: 1.5rem;
    }

    .english {
      font-size: 1.2rem;
    }
  }
</style>