<script lang="ts">
  import { onMount } from "svelte";
  import { fetchData } from "../lib/index";
  import { writable } from "svelte/store";

  let selectedSource: App.DataSource = "verbs";
  let elements: App.Element[] = [];
  let randomElement: App.Element | null = null;

  const hideTranslation = writable(false);

  const buttonConfigs = [
    { source: "verbs", label: "Verbs" },
    { source: "sentences", label: "Sentences" },
    { source: "sentences-hard", label: "Sentences+" },
    { source: "adverbs", label: "Adverbs"}
  ] as const;

  const dataSource = writable<App.DataSource>("verbs");

  async function fetchRandomElement() {
    elements = await fetchData(selectedSource);
    elements = elements.map(el => ({ ...el, difficulty: 1 })); // Set initial difficulty to normal
    changeElement();
  }

  function changeElement() {
    if (elements.length > 0) {
      // Weighted random selection based on difficulty
      const totalWeight = elements.reduce((sum, el) => sum + (3 - el.difficulty), 0);
      let random = Math.random() * totalWeight;
      
      for (let element of elements) {
        random -= (3 - element.difficulty);
        if (random <= 0) {
          randomElement = element;
          break;
        }
      }
    }
  }

  function changeHideTranslation() {
    hideTranslation.update(value => !value);
  }

  function markDifficulty(difficulty: number) {
    if (randomElement) {
      randomElement.difficulty = difficulty;
      changeElement();
    }
  }

  onMount(() => {
    fetchRandomElement();
  });

  function selectSource(source: App.DataSource) {
    selectedSource = source;
    dataSource.set(source);
    fetchRandomElement();
  }
</script>

<main>
<div class="button-container">
  {#each buttonConfigs as { source, label }}
    <button
      class:active={$dataSource === source}
      on:click={() => selectSource(source)}
    >
      {label}
    </button>
  {/each}
</div>

<div class="content">
  {#if randomElement}
  <div class="element">
    <p class="norsk">{randomElement.norsk}</p>
    {#if $hideTranslation}
    <p class="english">{randomElement.english}</p>
    {/if}
    <!-- <div class="difficulty-buttons">
      <button on:click={() => markDifficulty(0)}>Easy</button>
      <button on:click={() => markDifficulty(1)}>Normal</button>
      <button on:click={() => markDifficulty(2)}>Hard</button>
    </div> -->
  </div>
  {:else}
  <p class="loading">Loading...</p>
  {/if}
</div>

<button class="next-button" on:click={changeElement}>
  Next
</button>
<button 
  class="hide-translation-button" 
  class:active={$hideTranslation}
  on:click={changeHideTranslation}
  >
  {#if $hideTranslation}
  Hide translation
  {:else}
  Show translation
  {/if}
</button>



</main>
<style>
  :root {
    --primary-color: #4a90e2;
    --secondary-color: #f39c12;
    --third-color: #28a745;
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
  position: relative; /* Add this to position the button relative to the content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  height: 250px;
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

  .difficulty-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .difficulty-buttons button {
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    transition: all 0.3s ease;
  }

  .difficulty-buttons button:nth-child(1) {
    background-color: #2ecc71;
    color: white;
  }

  .difficulty-buttons button:nth-child(2) {
    background-color: #3498db;
    color: white;
  }

  .difficulty-buttons button:nth-child(3) {
    background-color: #e74c3c;
    color: white;
  }
  .hide-translation-button {
  padding: 14px 32px;
  font-size: 1.3rem;
  background-color: var(--primary-color);
  color: var(--button-text-color);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: absolute;
  bottom: 10px; /* Position from the bottom */
  right: 10px; /* Position from the right */
}

.hide-translation-button:hover {
  background-color: var(--third-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hide-translation-button.active {
  background-color: var(--third-color);
}

.hide-translation-button.active:hover{
  background-color: var(--primary-color);
}

</style>