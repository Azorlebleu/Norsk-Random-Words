// lib/index.ts

export async function fetchData(source: App.DataSource): Promise<App.Element[]> {
    let url: string;
    
    if (source === "verbs") {
      url = "/verbs.json"; // Change the URL to the path of your verbs JSON
    } else if (source === "sentences") {
      url = "/sentences.json"; // Change the URL to the path of your sentences JSON
    } else {
      throw new Error("Unknown data source");
    }
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
  
    return await response.json();
  }
  