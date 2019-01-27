import React from 'react';
import Dropzone from 'react-dropzone';
import * as style from './style';

const DropZone = ({ path, onDrop, name }) => {
	if (path) {
		return (
			<Dropzone onDrop={onDrop}>
				{({
					getRootProps,
					getInputProps,
					isDragActive,
					isDragAccept
				}) => (
					<style.FillFolder
						isDragActive={isDragActive}
						isDragAccept={isDragAccept}
						{...getRootProps()}
					>
						<input
							{...getInputProps()}
							style={{ display: 'relative', zIndex: 100 }}
						/>
					</style.FillFolder>
				)}
			</Dropzone>
		);
	} else {
		return (
			<Dropzone onDrop={onDrop}>
				{({
					getRootProps,
					getInputProps,
					isDragActive,
					isDragAccept
				}) => (
					<style.EmptyFolder
						isDragActive={isDragActive}
						isDragAccept={isDragAccept}
						{...getRootProps()}
					>
						<input
							{...getInputProps()}
							style={{ display: 'relative', zIndex: 100 }}
						/>
					</style.EmptyFolder>
				)}
			</Dropzone>
		);
	}
};

export default DropZone;
