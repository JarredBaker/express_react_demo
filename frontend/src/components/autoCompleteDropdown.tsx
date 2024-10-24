import React from 'react';

interface AutoCompleteDropdownProps {
	suggestions: Array<StarWarsPerson>;
	onClick: (arg0: StarWarsPerson) => void;
}

const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({ suggestions, onClick }) => {
	return (
		<ul className={"col-span-4 bg-white min-h-5 shadow border rounded p-4"}>
			{suggestions.length ? (
				suggestions.map((suggestion, index) => (
					<li
						key={suggestion.id + " " + index}
						onClick={() => onClick(suggestion)}
					>
						{suggestion.name}
					</li>
				))
			) : (
				<li>No suggestions available</li>
			)}
		</ul>
	);
};

export default AutoCompleteDropdown;
