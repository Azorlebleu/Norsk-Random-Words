declare namespace App {

	interface Element {
	  norsk: string;
	  english: string;
	  difficulty: number;
	}
  	// Define possible data sources
	type DataSource = "verbs" | "sentences" | "sentences-hard";
  }
  