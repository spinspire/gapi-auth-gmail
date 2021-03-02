<script>
  import Message from "./Message.svelte";

  let subject,
    format,
    messages = [];

  async function search() {
    messages = []; // clear results
    const result = await gapi.client.gmail.users.drafts.list({
      userId: "me",
      q: `subject:"${subject}"`,
      maxResults: 20,
    });
    for (let draft of result?.result?.drafts || []) {
      const message = await gapi.client.gmail.users.drafts.get({
        userId: "me",
        id: draft.id,
        format,
      });
      // console.log("message", message);
      messages = [...messages, message];
    }
  }
</script>

<h2>Search within your GMail mailbox "drafts" folder</h2>
<form on:submit|preventDefault={search}>
  <select bind:value={format}>
    <option>METADATA</option>
    <option>MINIMAL</option>
    <option>FULL</option>
    <option>RAW</option>
  </select>
  <input placeholder="search drafts by subject" bind:value={subject} required />
  <button type="submit">Search</button>
</form>

{#each messages as msg}
  <Message msg={msg.result} />
{:else}
  <p>No matches found.</p>
{/each}
