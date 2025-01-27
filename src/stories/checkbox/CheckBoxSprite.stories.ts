import { action } from '@storybook/addon-actions';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Layout } from '../../Layout';
import { CheckBox } from '../../CheckBox';
import { defaultTextStyle } from '../../utils/helpers/styles';
import { preloadAssets } from '../utils/loader';
import { centerElement } from '../../utils/helpers/resize';

const args = {
    text: '',
    textColor: '#FFFFFF',
    amount: 3,
    checked: false,
    onChange: action('Checkbox')
};

export const UseSprite = ({ checked, onChange, amount, textColor, text }: any) =>
{
    const view = new Layout({
        type: 'vertical',
        elementsMargin: 5
    });

    const assets = [`switch_off.png`, `switch_on.png`];

    preloadAssets(assets).then(() =>
    {
        for (let i = 0; i < amount; i++)
        {
            // Component usage !!!
            const checkBox = new CheckBox({
                text: text ?? `${text} ${i + 1}`,
                checked,
                style: {
                    unchecked: `switch_off.png`,
                    checked: `switch_on.png`,
                    text: {
                        ...defaultTextStyle,
                        fontSize: 22,
                        fill: textColor
                    }
                }
            });

            checkBox.onChange.connect((checked) => onChange(`${i + 1} ${checked}`));

            view.addChild(checkBox);
        }

        centerElement(view);
    });

    return { view, resize: () => centerElement(view) };
};

export default {
    title: 'Components/Checkbox/Use Sprite',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
