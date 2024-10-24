import React, {useState} from 'react';
import AutoCompleteDropdown from "./autoCompleteDropdown";
import StarWarsApiService from "../api/starWarsApi";
import GeneralHelper from "../helpers/generalHelper";

type SearchProps = {
	placeholder?: string;
	onSelect: (arg0: StarWarsPerson) => void;
}

const SearchBox: React.FC<SearchProps> = ({placeholder, onSelect}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [people, setPeople] = useState<Array<any>>([]);
	const [menuOpen, setMenuOpen] = React.useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMenuOpen(true);
		setSearchTerm(event.target.value);
		onSearch(searchTerm);
	};

	const onSearch = (query: string): void => {
		if (query.length >= 2) {
			StarWarsApiService.search({q: query}).then((result) => {
				setPeople(result.data.data);
			}).catch((error) => {
				console.log(error.response.data.error.message)
				if (error.response.data.error.message === "Invalid auth mechanism.") {
					GeneralHelper.callLogout();
				}
			})
		} else {
			setPeople([]);
		}
	}

	const selectCleanUp = (value: StarWarsPerson) => {
		setMenuOpen(false);
		onSelect(value)
	}

	return (
		<div>
			<div className={"form-group grid grid-cols-4"}>
				<input
					className="col-span-4"
					type="text"
					placeholder={placeholder || 'Search...'}
					value={searchTerm}
					onChange={handleInputChange}
				/>
				{menuOpen ? <AutoCompleteDropdown suggestions={people} onClick={selectCleanUp}/> : null}
			</div>
		</div>
	);
};

export default SearchBox;
