/**
 * SPDX-FileCopyrightText: © 2018 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {Link} from 'gatsby';
import React from 'react';

import useStateWithLocalStorage from '../Hooks/useStateWithLocalStorage';
import Search from './Search';

const spritemap = '/images/icons/icons.svg';

const DEV = process.env.GATSBY_CLAY_NIGHTLY === 'true';

export default (location) => {
	const [showAtlas, setShowAtlas] = useStateWithLocalStorage(
		true,
		'clay.showAtlas'
	);

	const [showSiteCss, setShowSiteCss] = useStateWithLocalStorage(
		true,
		'clay.showSiteCss'
	);

	const pathname = location.pathname || '';

	return (
		<nav className="navbar navbar-clay-site navbar-expand-lg navbar-light">
			<div className="autofit-float-sm-down autofit-padded autofit-row">
				<div className="autofit-col autofit-col-expand">
					<Search placeholder="Search..." />
				</div>
				<div className="autofit-col">
					<ul className="ml-auto navbar-nav">
						<li className="nav-item">
							<Link
								className="nav-link"
								style={{
									color: pathname.match(/docs\//g)
										? '#b3472d'
										: '',
								}}
								to="/docs/get-started/index.html"
							>
								<span className="c-inner" tabIndex="-1">
									{'Docs'}
								</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								activeStyle={{color: '#b3472d'}}
								className="nav-link"
								partiallyActive
								to="/blog"
							>
								<span className="c-inner" tabIndex="-1">
									{'Blog'}
								</span>
							</Link>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="http://storybook.clayui.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="c-inner" tabIndex="-1">
									{'Storybook'}
								</span>
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://codesandbox.io/s/liferay-clay-449ve"
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="c-inner" tabIndex="-1">
									{'Codesandbox'}
								</span>
							</a>
						</li>
						<li className="nav-item">
							<a
								className="ml-3 nav-link"
								href="https://github.com/liferay/clay"
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="c-inner" tabIndex="-1">
									<img
										alt="Github"
										className="github-logo"
										src="/images/home/github-logo.svg"
									/>
								</span>
							</a>
						</li>

						{DEV && (
							<li className="nav-item">
								<ClayDropDownWithItems
									footerContent={
										<>
											<ClayButton
												displayType="secondary"
												onClick={() =>
													window.location.reload()
												}
												style={{marginRight: 8}}
											>
												{'Refresh'}
											</ClayButton>

											<ClayButton
												displayType="secondary"
												onClick={() => {
													setShowAtlas(true);
													setShowSiteCss(true);

													window.location.reload();
												}}
											>
												{'Reset'}
											</ClayButton>
										</>
									}
									helpText="Changes will apply after refresh"
									items={[
										{
											checked: showAtlas,
											label: 'Show Atlas',
											onChange: () =>
												setShowAtlas(!showAtlas),
											type: 'checkbox',
										},
										{
											checked: showSiteCss,
											label: 'Show Site CSS',
											onChange: () =>
												setShowSiteCss(!showSiteCss),
											type: 'checkbox',
										},
									]}
									spritemap={spritemap}
									trigger={
										<ClayButtonWithIcon
											className="nav-link"
											displayType="unstyled"
											spritemap={spritemap}
											symbol="cog"
										/>
									}
								/>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
