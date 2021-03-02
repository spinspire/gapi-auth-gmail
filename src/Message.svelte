<script type="ts">
  export let msg;
  let to;
  const { id, message } = msg;
  const { labelIds, payload, snippet } = message;
  const { headers } = payload;
  async function send() {
    // console.log("msg", msg);
    const draft = await gapi.client.gmail.users.drafts.get({
      userId: "me",
      format: "raw",
      id,
    });
    // console.log("draft", draft);
    const raw = draft.result.message.raw;
    const decode = (b64) => atob(b64.replace(/_/g, "/").replace(/-/g, "+"));
    const encode = (bin) => btoa(bin).replace(/\//g, "_").replace(/\+/g, "-");
    const txt = decode(raw);
    const result = await gapi.client.gmail.users.messages.send({
      userId: "me",
      resource: { raw: encode(`To: ${to}\n` + txt) },
    });
    // console.log("result", result);
  }
</script>

<div class="wrapper">
  <div class="message">
    <span>Id</span>
    <span>{id}</span>
    <span>Labels</span>
    <span>{labelIds.join(", ")}</span>
    <span>Subject</span>
    <span>{headers.find(({ name }) => name == "Subject")?.value || ""}</span>
    <span>From</span>
    <span>{headers.find(({ name }) => name == "From")?.value || ""}</span>
    <span>To</span>
    <span>{headers.find(({ name }) => name == "To")?.value || ""}</span>
    {#if snippet}
      <span>Snippet</span>
      <span>{snippet}</span>
    {/if}
  </div>
  <p>Send a copy of the draft to given email</p>
  <form on:submit|preventDefault={send}>
    <input bind:value={to} required placeholder="Recipeint email" />
    <button type="submit">Send</button>
  </form>
</div>

<style>
  div.wrapper {
    box-shadow: 0px 0px 10px darkgrey;
    background-color: greenyellow;
    margin: 10px 0px;
    padding: 10px 10px;
    border-radius: 5px;
  }
  div.message {
    display: grid;
    grid-template-columns: 10em auto;
  }
</style>
