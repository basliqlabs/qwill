---
title: "ارائه کاهش خطاهای نرم‌افزاری: راه‌کارهای عملی برای توسعه پایدار"
description: "در دنیای توسعه نرم‌افزار، خطاها و باگ‌ها اجتناب‌ناپذیر هستند، اما با اتخاذ روش‌ها و ابزارهای مناسب می‌توان میزان و تأثیر آن‌ها را به حداقل رساند. در این مقاله جامع، به بررسی استراتژی‌های مختلف برای کاهش خطاهای نرم‌افزاری می‌پردازیم."
publishDate: '8 Apr 2025'
updatedDate: null
coverImage: null
series: null
collections: [ 'presentation', 'software', 'test', 'lint' ]
authors: [ 'atareversei' ]
draft: false
outdated: false
external: false
fire: false
ambientColor: null
---

## مقدمه: چرا کاهش خطاها حیاتیه؟

نرم‌افزارها عموما به عنوان زیرساخت دیجیتالی برای کسب‌وکارها و سازمان‌های مختلف به حساب می‌‌آن که فرآیند‌های خودشون از
قبیل خرید و فروش، بررسی وضعیت تجهیزات و نصبیات، ثبت فرم‌ها و غیره رو از این طریق به صورت اتوماتیک انجام می‌دن. بدیهیه که
با بروز کوچک‌ترین اختلالی در این نرم‌افزارها، انجام این فرآیندها با اختلال مواجه می‌شه و به علت **فزونی مقیاس انجام این
فرآیندها**، با ادامه یافتن هر ثانیه اختلال، این کسب‌وکارها **دچار زیان بسیار شدیدی** می‌شن.

خطاهای نرم‌افزاری می‌تونن منجر بشن به:

- از دست رفتن داده‌های کاربران
- آسیب به اعتبار کسب‌وکار
- هزینه‌های گزاف برای رفع مشکلات
- اتلاف وقت تیم توسعه

با پیاده‌سازی روش‌های سیستماتیک، می‌توان کیفیت کد رو بهبود داد و از بسیاری از خطاها قبل از رسیدن به محیط اجرا (
Production Environment) جلوگیری کرد. برای پروژه‌های کوچیک‌تر میشه این کارو به صورت دستی انجام داد ولی برای پروژه‌های
بزرگتر و با حساسیت بیش‌تر، نیاز یک روند اتوماتیک بیش‌تر حس می‌شه.

### چرا کد رو دستی چک نکنیم که درست کار می‌کنه یا نه؟

چون ممکن نیست.

#### حجم پروژه

بزرگترین پروژه‌ای که نوشتین، چه پروژه دانشگاهی بوده باشه، چه واسه دل خودتون نوشته باشینش، چه کاری باشه، چند خط بوده؟ ده
خط؟ پنجاه خط؟ صد خط؟ پونصد خط؟ هزار خط؟ ده هزار خط؟ صد هزار خط؟ یک میلیون خط؟

هر چقدر حجم پروژه بزرگ باشه، در همون حد هم سخت‌تر میشه اطمینان حاصل کرد که به هنگام ایجاد تغییرات در کد، برنامه هم درست
کار می‌کنه و عملا برای پروژه‌های بزرگ چند میلیون خطی، نمیشه این کار رو دستی انجام داد.

#### مدت زمان در حال توسعه بودن پروژه

پروژه‌هایی که رو اونا داشتین کار می‌کردین، چه مدت زمانی درگیرشون بودین؟ یک روز؟ یک هفته؟ یک ماه؟ یک سال؟ ده سال؟ پنجاه
سال؟ هر چقدر پروژه، مدت زمان بیش‌تری در حال توسعه بوده باشه، یعنی اینکه قسمت‌های زیادی از کد رو یا به احتمال قوی از
یادمون رفته، یا هم که نفر دیگه‌ای که در قید حیات نیست توسعه‌اش داده و نمی‌شه ازش سوال پرسید.

راه حل چیه؟ باید کد به گونه‌ای نوشته بشه که، فارغ از اینکه چه کسی و چه زمانی نوشته باشه، بتونیم به هدف اصلی اون کد پی
ببریم و مورد آزمون قرارش بدیم.

#### تعداد نفرات مشارکت‌کننده در پروژه

پروژه‌های شخصی معمولا یک نفر مشارکت‌کننده دارن، پروژه‌‌های دانشگاهی دو-سه نفری نوشته می‌شن و پروژه‌های کاری کوچیک، شاید
در حد ده نفر مشارکت‌کننده داشته باشن، ولی پروژه‌های بزرگ و با عمر زیاد چطور؟ خیلی راحت می‌شه گفت این نوع پروژه‌ها شاید
در حد هزار نفر در طول عمرشون مشارکت‌کننده داشته باشن. هرچقدر، تعداد مشارکت‌کننده بیش‌تر باشه، همون قدر هم کنترل و بررسی
ضعیف‌تره و اطمینان از اینکه کد جدیدی که توسط مشارکت‌کننده‌ای به پروژه اضافه شده موجب بروز مشکل نمی‌شه هم کم‌تره.

## انتخاب زبان: سیستم تایپ‌، ناجی پروژه‌های بزرگ

اگه خیلی ساده بخوام زبان‌ها رو از لحاظ داشتن تایپ دسته‌بندی کنم و روح طراحان زبان رو هم نخراشم، میتونم بگم یک سری از
زبان‌ها سیستم تایپشون داینامیکه (dynamically typed) و یه سری هم تایپشون استاتیکه (statically typed). تایپ داینامیک یعنی
اینکه متغیر تایپ نداره و عملا میتونه هر نوع داده‌ای باشه ولی توی استاتیک، این تایپ‌ها باید زمان اجرا مشخص باشن، یا حداقل
موقع ران‌تایم چک بشن.

```python fileName="example.py"
name = "amirata"
name = 12
name = True
```

```java fileName="example.java"
public String name = "amirata";
name = 12; // [!code error]
name = true; // [!code error]
```

این قسمت رو عاشقان پایتون و جاوااسکریپت از من نشنیده بگیرن، ولی بهتره که واسه پروژه‌های بزرگ از زبانی استفاده کنیم که یه
سیستم تایپ استاتیک و قوی داره، چون در طولانی مدت باعث میشه قسمتی از اهداف و نیات برنامه‌نویس‌ها داخل خود کد ثبت بشه. اگر
هنوز قانع نشدید، بیاید در مورد قطعه کد زیر بحث کنیم.

```js fileName="popup.js"
function displayPopup(config) {
    if (config.name === 'warning') {
        config.display_duration = 12_000;
    } else {
        cconfig.display_duration = false;
    }
    config.data = undefined;
    // ...
}
```

این قطعه کد برگرفته از یه تجربه واقعیه. من توی یکی از پروژه‌هایی که بودم توی اولین تسکم به این مورد برخوردم و بعدها
فهمیدم این کد پونزده سال پیش‌تر از زمان این تجربه، نوشته شده بود. حالا جدای بحث اینکه توی فیلد `name` چه رشته‌هایی
میتونن قرار بگیرن و بر چه معیاری باید پترن مچینگ کنیم و اینکه `display_duration` چرا هم مقدار `false` داره و هم عدد، بحث
مهم‌تر این بود که چرا فیلد `data` رو مساوی `undefined` قرار میدیم؟ **جواب دادن به این سوال سه ماه طول کشید** و **آخر سر
هم کاملا مطمئن نشدیم** که با تغییر دادن اون آیا دچار مشکل میشیم حین اجرا یا نه، مشکلاتی از این دسته که تو پروژه‌های بزرگ
مشکل‌آفرین میشه.

## لینتینگ (Linting) و فرمتینگ (Formatting)

### لینتینگ

لینترها ابزارهایی هستن که کد رو از نظر خطاهای نحوی، الگوهای مشکوک، و نقض استانداردهای کدنویسی بررسی می‌کنن. این ابزارها
به توسعه‌دهنده‌ها کمک می‌کنن تا مشکلات بالقوه رو قبل از اجرای کد شناسایی کنن، کیفیت کد را بهبود ببخشن و از باگ‌های رایج
جلوگیری نمایند. با پیشرفت کامپایلرها و مفسرها، نیاز به لینترها کم‌تر حس می‌شه.

#### ابزارهای لینتینگ

- **ESLint**: برای جاوااسکریپت و TypeScript
- **Pylint**: برای پایتون
- **Checkstyle**: برای جاوا

#### مزایای لینتینگ:

- شناسایی خطاهای نحوی قبل از اجرا
- اعمال استانداردهای کدنویسی
- یک‌دست کردن سبک کدنویسی در تیم

#### نمونه تنظیمات ESLint:

```javascript fileName="example.js" copy
module.exports = {
    rules: {
        'no-console': 'warn', // [!code highlight]
        'no-unused-vars': 'error', // [!code highlight]
        'import/prefer-default-export': 'off',
    },
};


// Example
let name = "atereversei";
let studies = "ce" // no-unused-vars // [!code error]

console.log() // no-console // [!code warning]
```

### فرمتینگ

فرمترها ابزارهایی هستن که به طور خودکار ساختار و ظاهر کد شما رو بر اساس استانداردهای مشخصی مرتب می‌کنن. این ابزارها
مواردی مانند فاصله‌گذاری، ترتیب ایمپورت‌ها، شکستن خطوط بلند، و سبک نوشتاری کد را یکپارچه می‌کنن تا کد تمیزتر و خواناتر
بشه.

#### ابزارهای محبوب:

- **Prettier**: پشتیبانی از چندین زبان مثل جاوااسکریپت و CSS
- **Black**: برای پایتون
- **gofmt**: برای گولنگ

#### چرا فرمتینگ مهمه؟

- کاهش اختلاف نظرهای بی‌اهمیت در تیم
- خوانایی بهتر کد
- جلوگیری از commitهای غیرضروری فقط برای تغییر فرمت

#### نمونه تنظیمات Prettier:

```js fileName="prettier.config.js"
const prettierRc = {
    printWidth: 80,
    useTabs: false,
    tabWidth: 2, // [!code highlight]
    semi: true, // [!code highlight]
    singleQuote: true, // [!code highlight]
    bracketSpacing: false,
    trailingComma: "es5",
    arrowParens: "always",
}


// Example

// inconsistent formatting
if (name === 'atareversei') { // [!code --]
    name = "ata" // [!code --]
} // [!code --]

// consistent formatting
if (name === 'atareversei') { // [!code ++]
    name = 'ata'; // [!code ++]
} // [!code ++] 

```

## کنترل ورژن با Git و GitHub

### بررسی کد (Code Review) با Git

کد ریویو تو گیت‌هاب یه فرآیند برای تضمین کیفیت کده که به توسعه‌دهنده‌ها اجازه می‌ده قبل از ادغام تغییرات برنچ فرعی در
برنچ اصلی، کد
همکارانشون رو بررسی کنن. این سیستم از کامنت‌گذاری خط به خط، درخواست تغییرات (request changes) و تایید نهایی (approval)
پشتیبانی می‌کنه. کد ریویوها نه تنها به شناسایی باگ‌ها و مشکلات منطقی کمک می‌کنن، بلکه فرصتی برای انتقال دانش و بهبود
استانداردهای کدنویسی در تیم هستن. با فعال‌سازی اجباری کد ریویو برای برنچ‌های اصلی، می‌توان از ادغام کدهای تست نشده یا
غیراستاندارد جلوگیری کرد.

<figure>
    <img src="/src/content/posts/presentation/reduce-software-error/github-code-review.webp" alt="عکس کد ریویو در گیت‌هاب" />
    <figcaption>یک مثال از کد ریویو در گیت‌هاب؛ در این تصویر می‌توان کد قبلی و کد جدید و کامنت فرد ریویوکننده رو مشاهده کرد.</figcaption>
</figure>

#### اصول بررسی کد:

- بررسی‌های کوچک و متمرکز (نهایتا 200-400 خط)
- استفاده از templateهای استاندارد برای pull request
- تعیین مالک (owner) برای بخش‌های مختلف کد
- محدود کردن زمان بررسی (ترجیحا کمتر از 24 ساعت)

### برنچ‌های محافظت‌شده (Protected Branches) در GitHub

برنچ‌های محافظت‌شده (مثل main یا master) ویژگی‌ای در گیت‌هاب هستن که از اعمال تغییرات مستقیم در این برنچ‌ها جلوگیری
می‌کنن. برای اعمال هر تغییری در این برنچ‌ها، باید از طریق pull request اقدام کرد و حداقل از یک یا چند ریویو، تاییدیه
دریافت کرد. این مکانیزم از خراب شدن کد برنچ اصلی توسط تغییرات ناگهانی یا تست نشده جلوگیری می‌کنه. هم‌چنین می‌توان قوانین
اضافه‌ای مانند نیاز به پاس شدن تست‌های CI یا بررسی توسط اعضای خاص تیم را برای این برنچ‌ها تعریف کرد.

#### تنظیمات معمول برای برنچ‌های محافظت‌شده:

- نیاز به بررسی حداقل ۲ نفر
- نیاز به گذراندن تمام تستها
- نیاز به به‌روز بودن با شاخه اصلی
- ممنوعیت push مستقیم
- نیاز به بررسی خطاهای لینتر

### مالکیت کد (Code Ownership)

فایل CODEOWNERS یک ویژگی قدرتمند در گیت‌هابه که این امکان رو می‌ده مالکان (owners) خاصی را برای بخش‌های مختلف پروژه
تعیین کنیم. وقتی فایلی در یک مسیر خاص تغییر می‌کنه، به طور خودکار از مالک مربوطه درخواست ریویو می‌شه.

#### روش پیاده‌سازی:

- فایل `CODEOWNERS` در root پروژه
- تقسیم مسئولیت بر اساس ماژول‌ها

```text fileName="CODEOWNERS"
* @team-lead @senior-dev
/frontend/ @frontend-team
/backend/ @backend-team
/migrations/ @db-admin

# if we make a change in
# -> /frontend/src/components/header/Header.tsx
# the following owners will be required to review
# the code before getting merged:

# @team-lead @senior-dev @frontend-team // [!code highlight]
 
```

### یکپارچه‌سازی و تحویل مستمر (CI/CD) با استفاده از گیت‌هاب

#### مزایای CI/CD:

- شناسایی زودهنگام خطاها
- تست خودکار پس از هر commit
- تحویل سریعتر و مطمئنتر

#### نمونه workflow در GitHub Actions:

```yaml fileName="deploy.yaml"
name: CI Pipeline

on: [ push, pull_request ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run unit tests
        run: npm test

      - name: Run e2e tests
        run: npm run test:e2e
```

## تست نرم‌افزار: انواع و استراتژی‌ها

تست نرم‌افزار فرآیندی اتوماتیک و سیستماتیک برای ارزیابی عملکرد یک برنامه‌ست تا مطمئن شیم که مطابق با نیازمندی‌های تعیین
شده عمل می‌کنه.

### تست‌های فرانت‌اند

تست فرانت‌اند متمرکز بر بررسی صحت عملکرد و نمایش رابط کاربریه. این نوع تست‌ها شامل بررسی کامپوننت‌های UI، تعاملات
کاربر و یکپارچه‌سازی با backend می‌شه.

#### تست واحد یا یونیت تست (Unit Test)

تست واحد روشی است که در آن کوچک‌ترین بخش‌های قابل تست یک نرم‌افزار (توابع) به صورت مجزا
و در isolation بررسی می‌شن. هدف اصلی این تست‌ها اینه که هر واحد کد به تنهایی و مستقل از سایر بخش‌ها به درستی کار
کنه. تست‌های واحد معمولا سریع اجرا می‌شن و چون کوچک‌ترین جزء سیستم رو هدف قرار می‌دن، معمولا بیش‌تر از سایر تست‌ها اهمیت
پیدا می‌کنن.

```ts fileName="query-params.test.ts"
describe('generateQueryParams', () => {
  const testCases: TestCase<GenerateQueryParamsDataType>[] = [
    {
      data: {
        queryParams: {
          name: 'ata'
        }
      },
      expected: '?name=ata',
      goal: 'handles basic usage'
    },
    {
      data: {queryParams: {}},
      expected: '',
      goal: 'handles empty objects',
    },
    // other test cases...
  ];

  testCases.forEach((tc) => {
    it(`returns '${tc.expected}' for input of ${tc.data.queryParams}`,
      () => {
        expect(generateQueryParams(tc.data.queryParams))
          .toBe(tc.expected);
      });
  });
});

```

#### تست یکپارچگی (Integration Tests)

تست یکپارچه‌سازی سطحی از تسته که تعامل بین ماژول‌ها یا سرویس‌های مختلف رو بررسی می‌کنه. برخلاف
تست واحد که هر بخش رو جداگانه تست می‌کنه، اینجا تمرکز بر روی این موضوعه که مطمئن شیم اجزای سیستم وقتی در کنار هم قرار
می‌گیرن به درستی کار می‌کنن. تو پروژه‌های فرانت‌اندی این مفهوم که دقیقا تست یکپارچه‌سازی کجای گستره تست قرار می‌گیره،
وجود داره و زیاد نباید سختش کرد. بیش‌تر مفهوم تست کردن کامپوننت‌ها و ارتباط‌شون با بک‌اند رو، تست یکپارچگی در نظر
می‌گیریم.

```tsx fileName="UserList.test.tsx"
it('should handle adding a new user', async () => {
  render(<UserList/>);

  await screen.findByText('Ata');

  userEvent.type(screen.getByLabelText(/name/i), 'Javad Vaseghi');
  userEvent.type(screen.getByLabelText(/email/i), 'j.vas@t.com');
  userEvent.click(screen.getByRole('button', {name: /add user/i}));

  await waitFor(() => {
    expect(screen.getByText('Javad Vaseghi')).toBeInTheDocument();
  });
});
```

```tsx fileName="UserList.tsx"
const UserList = () => {
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users`, { /* [!code highlight]*/
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
      });
    }
  }

  return (
    <div>
      <form>
        <label htmlFor='name'>Name</label> {/* [!code highlight]*/}
        <input name='name'/> {/* [!code highlight]*/}
        <label htmlFor='email'>Email</label> {/* [!code highlight]*/}
        <input name='email'/> {/* [!code highlight]*/}
        <button onClick={() => handleAddUser()}>Add User</button>
        {/* [!code highlight]*/}
      </form>

      <p>{user.name}</p>
    </div>
  )
}
```

```js fileName="mocks.js"
import {rest} from 'msw';

export const handlers = [
    rest.get(`${API_BASE_URL}/users`, (req, res, ctx) => {
        return res(ctx.json([]));
    }),
];
```

```js fileName="jest.config.js"
import {server} from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

#### تست end-to-end (E2E)

تست end-to-end جریان کامل یک برنامه رو از دیدگاه کاربر نهایی شبیه‌سازی می‌کنه. این تست‌ها، مرورگر رو باز می‌کنن،
با برنامه تعامل دارن و خروجی رو بررسی می‌کنن - دقیقا مثل یک کاربر واقعی. برخلاف تست‌های واحد، این تست‌ها کند هستن و
ازشون کمتر استفاده می‌شه.

#### استوری‌بوک (Strorybook)

استوری‌بوک یک ابزار تست بصری برای کامپوننت‌های UI عه که به توسعه‌دهنده‌‌ها اجازه می‌ده کامپوننت‌ها رو در isolation
بسازن و
تست کنن. با استوری‌بوک می‌تونیم حالت‌های مختلف یک کامپوننت رو مستندسازی کنیم، ورودی‌های (props) مختلف رو آزمایش کنیم و
ظاهر
اون رو در شرایط گوناگون بررسی کنیم.

```tsx fileName="AsyncButton.story.tsx"
import {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {l} from '@/languages/language';
import {AsyncButton} from './AsyncButton';

const meta: Meta<typeof AsyncButton> = {
  title: 'Async Button',
  component: AsyncButton,
  tags: ['autodocs'],
  args: {
    clickHandler: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof AsyncButton>;

export const States: Story = {
  args: {
    fullWidth: false,
    children: l.publ.auth.loginSubmitButton,
  },
};
```

### تست‌های بک‌اند

#### یونیت تست

```go fileName="richerror_test.go"
func TestRichError_GetKind(t *testing.T) {
  for _, tc := range getKindTestCases {
    t.Run(tc.description, func(t *testing.T) {
      if actual := buildRichError(tc.args); tc.expected != actual.GetKind() {
        t.Errorf("\nExpected: %v\nActual: %v\n", tc.expected, actual)
      }
    })
  }
}
```

#### تست API

- تست endpointهای REST/GraphQL
- ابزارها: Postman, Supertest, RestAssured

#### تست پایگاه‌داده

- تست migrationها
- تست queryها

## تست‌های اضافی برای کیفیت بهتر

### تست دسترسی‌پذیری (Accessibility Testing)

- ابزارها: Axe, Lighthouse

### تست عملکرد (Performance Testing)

- Load testing
- Stress testing
- ابزارها: k6, JMeter

### تست امنیت (Security Testing)

- اسکن وابستگی‌ها (Dependabot)
- اسکن کد (SonarQube, Snyk)
- تست نفوذ

## مانیتورینگ در محیط عملیاتی

حتی با تمام این تدابیر، برخی خطاها فقط در محیط تولید ظاهر میشون. ابزارهای مانیتورینگ:

- Sentry
- Datadog
- New Relic
- LogRocket

## نتیجه‌گیری
