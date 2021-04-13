export default [
  {
    type: 'supersedes',
    outward: {
      value: 'supersedes',
      label: 'supersedes',
    },
    inward: {
      value: 'is-superseded-by',
      label: 'is superseded by',
    },
  },
  {
    type: 'provides_post-cancellation_access_for',
    outward: {
      value: 'provides_post-cancellation_access_for',
      label: 'provides post-cancellation access for'
    },
    inward: {
      value: 'has-post-cancellation-access-in',
      label: 'has post-cancellation access in',
    },
  },
  {
    type: 'tracks_demand-driven_acquisitions_for',
    outward: {
      value: 'tracks_demand-driven_acquisitions_for',
      label: 'tracks demand-driven acquisitions for',
    },
    inward: {
      value: 'has-demand-driven-acquisitions-in',
      label: 'has demand-driven acquisitions in',
    },
  },
  {
    type: 'has_backfile_in',
    outward: {
      value: 'has_backfile_in',
      label: 'has backfile in',
    },
    inward: {
      value: 'has_frontfile_in',
      label: 'has frontfile in',
    },
  },
  {
    type: 'related_to',
    outward: {
      value: 'related_to',
      label: 'related to',
    },
    inward: {
      value: 'related_to_inward',
      label: 'related to',
    },
  },
];
