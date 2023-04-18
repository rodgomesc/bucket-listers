### Credit Card Validation example

<video src="https://user-images.githubusercontent.com/4893591/232889916-1e82bd68-f442-4821-928d-8a13ace0486b.mp4" width="320" height="600" controls preload></video>

### Unit Tests

> ![image](https://user-images.githubusercontent.com/4893591/232885185-eac51e0e-bda6-4d87-811e-b30a5ba3d2de.png)

## Organization and structure of folders

```shell
.
├── App.tsx
├── components
│   ├── atoms
│   │   ├── Button
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.tsx
│   │   └── TextInput
│   │       ├── TextInput.test.tsx
│   │       └── TextInput.tsx
│   ├── molecules
│   │   └── CardInput
│   │       ├── CardInput.test.tsx
│   │       └── CardInput.tsx
│   ├── organisms
│   │   └── CreditCardForm
│   │       ├── CreditCardForm.test.tsx
│   │       └── CreditCardForm.tsx
│   └── templates
│       └── ScreenContainer.tsx
├── screens
│   └── CreditCardValidationScreen
│       ├── CreditCardValidationScreen.test.tsx
│       └── CreditCardValidationScreen.tsx
├── styles
│   ├── buttons.ts
│   ├── colors.ts
│   ├── radius.ts
│   ├── spacing.ts
│   ├── text.ts
│   ├── theme.ts
│   └── typography.ts
└── utils
    └── validation
        ├── creditCardValidation.test.ts
        └── creditCardValidation.ts

15 directories, 21 files
```

## Feedbacks

+55 64 98414-7972 or rodgomesc@gmail.com
