import React, {useEffect} from "react";
import AuthedHeader from "../../components/AuthedHeader";
import SearchBox from "../../components/SearchBox";
import SiteConfigApi from "../../api/siteConfigApi";

const HomePage: React.FC = () => {
	const [person, setPerson] = React.useState<StarWarsPerson | null>(null);
	const [offset, setOffset] = React.useState<number>(0);
	const [updateResult, setUpdateResult] = React.useState<string | null>(null);

	const onUpdateCacheOffset = (): void => {
		if (!offset) return;
		SiteConfigApi.updateCacheOffset({cacheOffSet: offset}).then(r => {
			setUpdateResult(r.data.message);
		}).catch((error) => {
			console.log(error);
		})
	}

	useEffect(() => {
		SiteConfigApi.getCacheOffset().then(r => {
			console.log(JSON.stringify(r));
			setOffset(r.data.offset);
		}).catch((error) => {
			console.log(error);
		})
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setUpdateResult(null);
		}, 2000)
	}, [updateResult])

	return (
		<div>
			<AuthedHeader/>
			<div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16"}>
				<div className="grid grid-cols-4">
					<h2 className={"text-3xl mb-3 col-span-2 mt-auto"}>Search star wars characters</h2>

					<div className={"form-group col-span-2"}>
						{updateResult && <p className={"text-green-600"}>{updateResult}</p>}
						<label htmlFor="cacheoffset" className={"font-satisfy"}>Update search caching (in seconds):</label>
						<div className={"grid grid-cols-4 gap-1"}>
							<input
								className="col-span-3"
								type="number"
								id="cacheoffset"
								name="cacheoffset"
								placeholder={'Offset'}
								value={offset || 0}
								onChange={(e) => setOffset(parseInt(e.currentTarget.value))}
							/>
							<button className={"col-span-1 bg-blue-300 rounded cursor-pointer p-2 text-sm"} onClick={onUpdateCacheOffset}>Update cache offset</button>
						</div>
					</div>
				</div>

				<SearchBox onSelect={setPerson}/>
				{person ? (
					<ul className={"max-w-96"}>
						{Object.entries(person).map(([key, value]) => (
							<li key={key + " " + value} className="flex justify-between py-2 border-b border-gray-300">
								<span className="font-semibold w-1/3">{key}</span>

								<span className="flex-1">
                  {Array.isArray(value) ? (
							    	<ul className="list-none text-left">
							    		{value.map((item, index) => (
							    			<li key={item + " " + index}>{item}</li>
							    		))}
							    	</ul>
							    ) : (
							    	value
							    )}
                </span>
							</li>
						))}
					</ul>
				) : (
					<p>No star wars character has been selected</p>
				)}
			</div>
		</div>
	);
}

export default HomePage
