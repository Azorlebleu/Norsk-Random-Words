
export async function fetchData(source: App.DataSource): Promise<App.Element[]> {
    let url: string;
    
    if (source) {
      url = `/${source}.json`; 
    }

    else {
      throw new Error("Unknown data source");
    }
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
  
    return await response.json();
  }
  