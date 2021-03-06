/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export async function initializeEnvironment() {
  // Issue #57: Disable login saving for extension pages.
  const origin = browser.extension.getURL("").slice(0, -1);
  const savingEnabled = await browser.experiments.logins
    .getLoginSavingEnabled(origin);
  if (savingEnabled) {
    await browser.experiments.logins
      .setLoginSavingEnabled(origin, false);
  }

  // NOTE: %DOMAIN% is replaced by the browser with the context's location:
  //  * context menu -> "Fill Password" / "Fill Login" -> "Saved Logins"
  //  * autofill dropdown -> "Saved logins"
  // %DOMAIN* is "" if there is no context (e.g., from main menu -> "Passwords and Logins")
  const mgmtURI = browser.extension.getURL("/list/manage.html?filter=%DOMAIN%");
  await browser.experiments.logins.setManagementURI(mgmtURI);
}
