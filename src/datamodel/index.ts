class Serialized {
  private identifier: string;
  constructor(_id: string) {
    this.identifier = _id;
  }

  public id(): string {
    return this.identifier;
  }
}

/**
"_id": "5d5d7ad6570814f5f612116e",
"age": 39,
"eyeColor": "green",
"name": "Holman Preston",
"gender": "male",
"location": {
  "latitude": -11.533498,
  "longitude": 168.340816
},
"preferences": {
  "pet": "dog",
  "fruit": "strawberry"
}
*/

export enum Gender {
  MALE = 0,
  FEMALE,
}

export interface Location {
  latitude: string;
  longitude: string;
}

export interface Preferences {
  [key: string]: string;
}

export interface PersonJSON {
  _id: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: "male" | "female";
  location: Location;
  preferences: Preferences;
}

export class Person extends Serialized {
  public searchString = "";
  public country = "";
  constructor(
    _id: string,
    public name: string,
    public age: number,
    public gender: Gender,
    public location: Location,
    public preferences: Preferences,
    public eyeColor: string
  ) {
    super(_id);
    this.createSearchString();
    // this.extractCountry();
  }

  /**
   * Function which will help with searching on multiple fields.
   * Concats all information on a single string to use that string with String.includes function.
   */
  createSearchString(): void {
    this.searchString = `${this.name},${this.age},${
      this.gender
    },${Object.values(this.preferences).reduce((a, b) => a + b + ",", "")}`;
    console.log(this.searchString);
  }

  // extractCountry() {
  //   let country = country_reverse_geocoding(47.3, 0.7);
  //   console.log(country.getCountry()); // France
  // }

  fromJSON(data: PersonJSON): Person {
    return new Person(
      data._id,
      data.name,
      data.age,
      data.gender === "male" ? Gender.MALE : Gender.FEMALE,
      data.location,
      data.preferences,
      data.eyeColor
    );
  }

  toJSON(): PersonJSON {
    return {
      _id: this.id(),
      age: this.age,
      eyeColor: this.eyeColor,
      name: this.name,
      gender: this.gender === 0 ? "male" : "female",
      location: this.location,
      preferences: this.preferences,
    };
  }

  fromPersonJSONArray(data: PersonJSON[]): Person[] {
    return data.map((elem: PersonJSON) => Person.prototype.fromJSON(elem));
  }
}
