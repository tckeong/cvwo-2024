import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faLaptopCode, faComputer, faHandHoldingDollar, faKitMedical, faUtensils, faPlane, faChalkboard,
          faPersonRunning, faShirt, faMusic, faGamepad, faBook, faPalette, faBriefcase, faMicroscope, faNewspaper, faHandshake, faBars } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { ReactNode } from 'react';

type pair = [string, ReactNode];

const Tags: pair[] = [
    ["Technology", <FontAwesomeIcon icon={faMicrochip} />],
    ["Programming Language", <FontAwesomeIcon icon={faLaptopCode} />],
    ["Computer Science", <FontAwesomeIcon icon={faComputer} />],
    ["Finance", <FontAwesomeIcon icon={faHandHoldingDollar} />],
    ["Health", <FontAwesomeIcon icon={faKitMedical} />],
    ["Food", <FontAwesomeIcon icon={faUtensils} />],
    ["Travel", <FontAwesomeIcon icon={faPlane} />],
    ["Education", <FontAwesomeIcon icon={faChalkboard} />],
    ["Sport", <FontAwesomeIcon icon={faPersonRunning} />],
    ["Fashion", <FontAwesomeIcon icon={faShirt} />],
    ["Music", <FontAwesomeIcon icon={faMusic} />],
    ["Movie", <FontAwesomeIcon icon={faYoutube} />],
    ["Game", <FontAwesomeIcon icon={faGamepad} />],
    ["Book", <FontAwesomeIcon icon={faBook} />],
    ["Art", <FontAwesomeIcon icon={faPalette} />],
    ["Business", <FontAwesomeIcon icon={faBriefcase} />],
    ["Science", <FontAwesomeIcon icon={faMicroscope} />],
    ["News", <FontAwesomeIcon icon={faNewspaper} />],
    ["Politics", <FontAwesomeIcon icon={faHandshake} />],
    ["Other", <FontAwesomeIcon icon={faBars} />],
];

export const TagsLabel = Tags.map((tag) => tag[0]);

export default Tags;