
export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ItineraryResult {
  text: string;
  sources: GroundingSource[];
  mapImageUrl?: string;
}

export interface TravelPreferences {
  destination: string;
  duration: number;
  interests: string[];
  month: string;
  budget: number | '';
  travelerType: 'sozinho' | 'casal' | 'família' | 'amigos' | '';
}

export interface TravelSuggestion {
  destination: string;
  duration: number;
  interests: string[];
  description: string;
  imageUrl: string;
}