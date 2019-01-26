import React from 'react';
import CountUp from 'react-countup';

import * as style from './style';

const mapSummaryToCircle = (summary, onChangeMode) => {
	return Object.keys(summary).map((info, index) => {
		if (info === 'delFiles') {
			// add
			return (
				<style.AddCircle
					key={index}
					onClick={() => onChangeMode('del')}
				>
					<CountUp
						start={0}
						end={summary[info]}
						duration={3}
						prefix="삭제 "
						suffix="개"
					/>
				</style.AddCircle>
			);
		} else if (info === 'addFiles') {
			return (
				<style.DelCircle
					key={index}
					onClick={() => onChangeMode('add')}
				>
					<CountUp
						start={0}
						end={summary[info]}
						duration={3}
						prefix="추가 "
						suffix="개"
					/>
				</style.DelCircle>
			);
		} else if (info === 'modFiles') {
			return (
				<style.ModCircle
					key={index}
					onClick={() => onChangeMode('mod')}
				>
					<CountUp
						start={0}
						end={summary[info]}
						duration={3}
						prefix="수정 "
						suffix="개"
					/>
				</style.ModCircle>
			);
		}
	});
};

const Summary = ({ summary, onChangeMode }) => {
	if (summary) {
		return (
			<style.Wrapper>
				{mapSummaryToCircle(summary, onChangeMode)}
			</style.Wrapper>
		);
	} else {
		return <div />;
	}
};

export default Summary;
