<script lang="ts">
  import { formatDate } from 'src/date';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const bits = data.bits.map((bit) => ({
    filename: bit[0],
    date: new Date(bit[1]),
    artifact: bit[2] && !Array.isArray(bit[2]) ? bit[2] : null,
    tags: (Array.isArray(bit[3] ?? bit[2]) ? bit[3] ?? bit[2] : []) as string[]
  }));
</script>

<ThemeRoot background="#032304">
  <layout-container>
    <h1>bits and fragments</h1>
    <p>bits and fragments</p>
    <table>
      <tbody>
        <tr>
          <th>date</th>
          <th>filename</th>
          <th>was for</th>
        </tr>

        {#each bits as bit}
          <tr>
            <td>{formatDate(bit.date, 'date-time')}</td>
            <td>
              <Link href="https://media.paperdave.net/bit/{bit.filename}">{bit.filename}</Link>
            </td>
            <td>
              {#if bit.artifact}
                <span>
                  {bit.artifact}
                </span>
              {/if}
              {#each bit.tags as tag}
                <span>
                  {tag}
                </span>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </layout-container>
</ThemeRoot>

<style lang="scss">
</style>
