import { produce } from "immer";
import { getModifier } from "../utils/helpers";
import Klasses from "./Klasses";
import Skills from "./Skills";

const Character = ({ attributes, updateCharacter, skills, index }) => {
    const getTotalAttributePoints = () =>
        attributes.reduce((total, attribute) => total + attribute.value, 0);

    const handleClick = (name, value) => {
        const updatedAttributes = produce(attributes, (draftAttributes) => {
            const attributeIndex = draftAttributes.findIndex(
                (attribute) => attribute.name === name
            );
            draftAttributes[attributeIndex].value = value;
        });
        updateCharacter({ attributes: updatedAttributes });
    };

    return (
        <div>
            <h1 style={{ marginTop: 40 }}>Character #{index}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="box">
                    <h2>Attributes</h2>
                    {attributes.map(({ name, value }) => (
                        <div key={name}>
                            <span style={{ marginRight: 20 }}>
                                <span>{name} :</span>
                                <span>{value}</span>
                                <span style={{ marginLeft: 10 }}>
                                    (Modifier :
                                </span>
                                <span>{getModifier(value)})</span>
                            </span>
                            <button
                                onClick={() => handleClick(name, value - 1)}
                                style={{ marginRight: 2 }}
                            >
                                -
                            </button>
                            <button
                                onClick={() => {
                                    if (getTotalAttributePoints() !== 70) {
                                        handleClick(name, value + 1);
                                    } else {
                                        alert(
                                            "A Character can have up to 70 Delegated Attribute Points"
                                        );
                                    }
                                }}
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
                <Klasses characterAttributes={attributes} />
                <Skills
                    attributes={attributes}
                    skills={skills}
                    updateCharacter={updateCharacter}
                />
            </div>
        </div>
    );
};

export default Character;
