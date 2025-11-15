
export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ItineraryResult {
  text: string;
  sources: GroundingSource[];
}

export interface TravelPreferences {
  destination: string;
  duration: number;
  interests: string[];
  month: string;
  budget: number | '';
  travelerType: 'sozinho' | 'casal' | 'família' | 'amigos' | '';
}