# Admin CLI for Vitrine

## How to Install

To install, you need to login to Github NPM Registry. If you have 2FA enabled,
you need to [create a personal access token first](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and use it instead
of your Github password.

```bash
npm login --scope=@vitrin-app --registry=https://npm.pkg.github.com
```

Also configure NPM to fetch `@vitrin-app` packages from Github registry (but not the rest):

```bash
npm config set @vitrin-app:registry https://npm.pkg.github.com
```

<br>

Now you can install / update the CLI:

```bash
npm i -g @vitrin-app/admin-cli
```

<br>

## How to Run

Install first (obviously) then run the following:

```bash
vitrine-admin-cli
```

<br><br>