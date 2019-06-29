## Converting Preference Params

### Formats for category / location / industry preferences:
##### 1. __Database__
- __data type__: string
- __item format__: http query param format
- __item separator__: `|`
- __example__:

```rb
{
  pref_categories: "Creative+%26+Design|Data+Science|Engineering"
  pref_levels: "Entry+Level|Mid+Level"
  pref_locations: "Brooklyn%2C+NY|New+York%2C+NY|San+Francisco%2C+CA"
}
```

##### 2. __theMuse API query__
- __data type__: string
- __item format__: http query param format
- __item separator__: `&<CRITERIA>=`
- __example__:

```sh
curl -G "https://www.themuse.com/api/public/jobs? \
location=Brooklyn%2C+NY&location=New+York%2C+NY&location=San+Francisco%2C+CA \
&category=Creative+%26+Design&category=Data+Science&category=Engineering \
&level=Entry+Level&level=Mid+Level"
```

##### 3. __UI Display__
  - __data type__: array
  - __item format__: readable for display
  - __item separator__: (array)
  - __example__:

  ```rb
  {
    pref_categories: ["Data Science", "Creative & Design"],
    pref_levels: ["Entry Level", "Mid Level"],
    pref_locations: ["Brooklyn, NY", "New York, NY", "San Francisco, CA"]
  }

  ```
---

### Flow



1. Retrieve preferences from database
2. __Saving to frontend state__: Convert to UI format => save Array to frontend state
3. __Update Display    
