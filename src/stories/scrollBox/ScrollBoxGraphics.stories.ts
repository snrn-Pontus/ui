
import { Graphics as PixiGraphics, Text, Container } from 'pixi.js';
import { argTypes, getDefaultArgs } from '../../utils/storybook/argTypes';
import { ScrollBox } from '../../ScrollBox';
import { Button } from '../../Button';
import { defaultTextStyle } from '../../utils/storybook/styles';
import { action } from '@storybook/addon-actions';
import { centerElement } from '../../utils/storybook/resize';

const args = {
    type: [
        'vertical',
        'horizontal',
    ],
    fontColor: '#000000',
    backgroundColor: '#F5E3A9',
    width: 300,
    height: 420,
    radius: 20,
    elementsMargin: 10,
    elementsPadding: 10,
    elementsWidth: 300,
    elementsHeight: 80,
    itemsCount: 100,
    onPress: action('Button was pressed > '),
}
    
export const Graphics = ({
    type,
    fontColor,
    elementsMargin,
    elementsPadding,
    elementsWidth,
    elementsHeight,
    width,
    height,
    radius,
    itemsCount,
    backgroundColor,
    onPress,
}: any) => {
    const view = new Container();

    backgroundColor = Number(backgroundColor.replace('#', '0x'));
    fontColor = Number(fontColor.replace('#', '0x'));

    const items = [];

    for (let i = 0; i < itemsCount; i++) {
        const button = new Button({
            view: new PixiGraphics().beginFill(0xA5E24D).drawRoundedRect(0, 0, elementsWidth, elementsHeight, radius), 
            hoverView: new PixiGraphics().beginFill(0xFEC230).drawRoundedRect(0, 0, elementsWidth, elementsHeight, radius), 
            textView: new Text(`Item ${i + 1}`, { ...defaultTextStyle, fill: fontColor || defaultTextStyle.fill }), 
        });

        button.onPress.connect(() => onPress(i + 1));

        items.push(button);
    }

    // Component usage !!!
    const scrollBox = new ScrollBox({
        background: backgroundColor,
        type,
        elementsMargin,
        width,
        height,
        radius,
        padding: elementsPadding,
        items,
    });

    view.addChild(scrollBox);

    return { view, resize: () => centerElement(view)};
};

export default {
    title: 'UI components/ScrollBox/Graphics',
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
};