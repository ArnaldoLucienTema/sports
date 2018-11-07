
export class FilterSearch {
  form: string;
  search_item: string;
  filters: string[];
  values: string[];
  selected_filter: string;
  selected_value: any;
  selected_value_end: string;
  value_suffix: string;
}

/*


search_item: "personal_info.name"
selected_filter: VER TABELA ABAIXO
selected_value: valor em que usas o search_filter em search_item


$eq	Matches values that are equal to a specified value.
$gt	Matches values that are greater than a specified value.
$gte	Matches values that are greater than or equal to a specified value.
$in	Matches any of the values specified in an array.
$lt	Matches values that are less than a specified value.
$lte	Matches values that are less than or equal to a specified value.
$ne	Matches all values that are not equal to a specified value.form
$nin	Matches none of the values specified in an array.
$regex Contains a substring into text, or more complex shit.
*
* */
