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

  <button class="full-screen-button" on:click={changeElement} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && changeElement()}>
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
  </button>
</main>

<style>
  /* Button container styling */
  .button-container {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1rem;
  }

  .button-container button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }

  .button-container button:hover {
    background-color: #0056b3;
  }

  /* Full screen button styling remains the same */
  .full-screen-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    cursor: pointer;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 90%;
  }

  .element p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }

  @media (min-width: 768px) {
    .element p {
      font-size: 2rem;
    }
  }

  .full-screen-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 150, 250, 0.5);
  }

  .full-screen-button:active .content {
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>
