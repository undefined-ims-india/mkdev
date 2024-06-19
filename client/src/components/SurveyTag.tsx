import React from 'react';
interface Props {
	tag: TagsResponse;
	selectedTags: TagsResponse[];
	toggleTag: (tag: TagsResponse) => void;
}

interface TagsResponse {
	id: number;
	tagType: 'User' | 'Post';
	name: string;
}

//want this to be a chip and it toggles to light color on select with sx element 
export default function (props: Props) {
	const { tag, toggleTag, selectedTags } = props;
	return (
		<div key={tag.id}>
			<label>
				<input
					type='checkbox'
					checked={selectedTags.includes(tag)}
					onChange={() => toggleTag(tag)}
				/>
				{tag.name}
			</label>
		</div>
	);
}
