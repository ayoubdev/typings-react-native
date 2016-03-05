//REACT.JS namespace import:
import React = __React;

//On utilise un namespace avec le même nom que celui de reactjs (__React)
//pour obtenir une définition globale mixée entre celles de react et celles de react-native.
//Pour plus de détails d.ts JSX: https://github.com/Microsoft/TypeScript/wiki/JSX
declare namespace __React {
	//Custom Types:
	type color = string;

	//Event:
	//Les interfaces ne sont sont pas pris en compte lors de la transpilation:
	//donc si on a dans notre ts: import TestEvent = __React.TestEvent;
	//cette ligne sera ignorée lors de la transpilation: c'est top pour définir des types
	//sans avoir à se soucier d'un import n'existant pas en js.
	//Par contre, les classes sont prises en compte lors de la transpilation:
	interface NativeEvent {
		bubbles: boolean;
		cancelable: boolean;
		currentTarget: EventTarget;
		defaultPrevented: boolean;
		eventPhase: number;
		isTrusted: boolean;
		preventDefault(): void;
		stopPropagation(): void;
		target: EventTarget;
		timeStamp: Date;
		type: string;
	}
	interface EventLayout extends NativeEvent {
		nativeEvent: {
			layout: {
				x: number;
				y: number;
				width: number;
				height: number;
			}
		}
	}
	interface NativeEventHandler<T extends NativeEvent> {
		(event:T): void;
	}

	interface FlexboxStyles {
		alignItems?:"flex-start"|"flex-end"|"center"|"stretch";
		alignSelf?:"auto"|"flex-start"|"flex-end"|"center"|"stretch";
		borderBottomWidth?:number;
		borderLeftWidth?:number;
		borderRightWidth?:number;
		borderTopWidth?:number;
		borderWidth?:number;
		bottom?:number;
		flex?:number;
		flexDirection?:"row"|"column";
		flexWrap?:"wrap"|"nowrap";
		height?:number;
		justifyContent?:"flex-start"|"flex-end"|"center"|"space-between"|"space-around";//string
		left?:number;
		margin?:number;
		marginBottom?:number;
		marginHorizontal?:number;
		marginLeft?:number;
		marginRight?:number;
		marginTop?:number;
		marginVertical?:number;
		padding?:number;
		paddingBottom?:number;
		paddingHorizontal?:number;
		paddingLeft?:number;
		paddingRight?:number;
		paddingTop?:number;
		paddingVertical?:number;
		position?:"absolute"|"relative";
		right?:number;
		top?:number;
		width?:number;
	}
	interface TransformsStyles {
		transform?:Array<{[key: string]:any}>;
		transformMatrix?:(props:Object, propName:string, componentName:string) => Error|any;
	}
	interface ShadowPropTypesIOS {
		shadowColor: color;
		shadowOffset: {
			width: number;
			height: number;
		};
		shadowOpacity: number;
		shadowRadius: number;
	}

	interface ViewStylesAndroid {
		elevation?:number;
	}
	interface ViewStylesIOS {
	}
	interface ViewStyles extends FlexboxStyles, TransformsStyles, ViewStylesAndroid, ViewStylesIOS {
		backfaceVisibility?:"visible"|"hidden";
		backgroundColor?:color;
		borderBottomColor?:color;
		borderBottomLeftRadius?:number;
		borderBottomRightRadius?:number;
		borderBottomWidth?:number;
		borderColor?:color;
		borderLeftColor?:color;
		borderLeftWidth?:number;
		borderRadius?:number;
		borderRightColor?:color;
		borderRightWidth?:number;
		borderStyle?:"solid"|"dotted"|"dashed";
		borderTopColor?:color;
		borderTopLeftRadius?:number;
		borderTopRightRadius?:number;
		borderTopWidth?:number;
		borderWidth?:number;
		opacity?:number;
		overflow?:"visible"|"hidden";
	}

	interface TextStyles {
		//tt:string|number;
	}

	/*
	//AllStyles utile si l'on veut restreindre les types et attributs possibles à injecter dans class StyleSheet:
	//Dans ce cas, on aurait définit:
	interface AllStyles extends ViewStyles, TextStyles {
	}
	class StyleSheet {
		static create(obj:{[key: string]:AllStyles}):any;
		static hairlineWidth:number;
	}
	*/

	//PROPERTIES:
	//Définition propriétés <View/>:
	interface ViewPropsAndroid {

	}
	interface ViewProps {
		accessibilityLabel?:string;
		accessible?:boolean;
		onAccessibilityTap?:() => void;
		onLayout?:NativeEventHandler<EventLayout>;
		onMagicTap?: () => void;
		//cf. https://facebook.github.io/react-native/docs/gesture-responder-system.html:
		onMoveShouldSetResponder?: () => void;
		onMoveShouldSetResponderCapture?: () => void;

		style?:ViewStyles;
	}

	//COMPONENTS:
	class Text extends Component<any, any> {
	}
	class View extends Component<ViewProps, any> {
	}
	class StyleSheet {
		static create(obj:{[key: string]:any}):any;

		static hairlineWidth:number;
	}

	/*
	//class View extends Component<ViewProps, any> équivalent à:
	class View extends Component<any, any> {
		props: {
			testprop:string
		}
		render():JSX.Element;
	}
	*/
}

declare namespace JSX {
	/*
	//Les éléments intrinsèques permettent de définir rapidement des
	//éléments dom, vues... n'étant pas des composants
	//(par exemple, balises HTML pour react.js (cf. react.d.ts))
	//Les éléments intrisèques sont émis comme string par React (React.createElement("div"))
	//contre React.createElement(MyComponent) pour un composant
	//cf. https://github.com/Microsoft/TypeScript/wiki/JSX#type-checking
	interface IntrinsicElements {
		toto: { bar?: boolean }
	}
	*/

	/*
	//JSX.ElementAttributesProperty permet de spécifier le nom de l'objet
	//qui sera utilisé comme référence pour vérifier le type des propriétés d'un
	//composant [ElementAttributesProperty ne doit renseigner qu'un
	//seul nom de stockage des propriétés] (ici, ce sera "props" mais comme déjà défini dans react.d.ts,
	//inutile de le répéter (sinon duplicate entry error)):
	interface ElementAttributesProperty {
		props: Object;
	}
	*/
}

declare module 'react-native' {
	export class Component<P, S> extends React.Component<P,S> {
	}
	export class Text extends React.Text {
	}
	export class View extends React.View {
	}
	export class StyleSheet extends React.StyleSheet {
	}
	export var PropTypes:React.ReactPropTypes;

	export default React;
}

/*
 //exemple d.ts avec modules:
 declare module Module1 {
 function toto(): string;

 class Blabla {
 constructor();
 haha(): void;
 }
 }

 declare module Module2 {
 function tata(): string;

 class Bloblo {
 constructor();
 haha(): void;
 }
 }

 declare module "example-module" {
 //export default que si un seul élément à exporter sur tout le fichier:
 //export default Module1;
 export {Module1, Module2};
 }*/

//EXEMPLE CONCRET DTS POUR UN MODULE JS:
//Pour le module JS suivant:
/*
 class ClassJS {
 createString() {
 return "Ayoub Example Module";
 }
 }

 export default ClassJS;
 */
//Nous avons définit nos déclaration typescript de cette manière:
/*
 declare namespace ExampleNamespace {
 interface Example {
 createString(): void;
 }

 interface ExampleFactory {
 new(): Example;
 (numberToString: number): Example;
 }

 export var ClassJS: ExampleFactory;
 }

 declare module 'example-module' {
 import ClassJS = ExampleNamespace.ClassJS;
 export default ClassJS;
 }
 */
/*
 //Example d'utilisation en TS pour générer le bon JS depuis example-module module nodejs:
 import ClassJS from 'example-module';

 var w = ClassJS(32);
 var y = new ClassJS("blabla");
 w.createString();
 y.createString();
 */
