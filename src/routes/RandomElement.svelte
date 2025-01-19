<script lang="ts">
  export let randomElement: App.Element | null = null;
  export let onClick: () => void;
</script>

<button class="full-screen-button" on:click={onClick} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
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

<style>
  /* Reuse the same styles as above */
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
